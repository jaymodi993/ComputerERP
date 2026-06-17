const { sql } = require("../config/db");
const generateInvoicePDF = require("../utils/invoicePdf");

const createInvoice = async (req, res) => {
  try {
    const { JobID, PaymentMode } = req.body;

    // GET CHARGES

    const charges = await sql.query`

SELECT *

FROM RepairCharges

WHERE JobID=${JobID}

`;

    let taxableAmount = 0;

    let gstAmount = 0;

    charges.recordset.forEach((item) => {
      let amount = Number(item.Amount);

      let gst = Number(item.GSTPercent || 18);

      taxableAmount += amount;

      gstAmount += (amount * gst) / 100;
    });

    let cgst = gstAmount / 2;

    let sgst = gstAmount / 2;

    let igst = 0;

    let grandTotal = taxableAmount + gstAmount;

    // INVOICE NUMBER

    const count = await sql.query`

SELECT COUNT(*) as Total

FROM Invoices

`;

    let next = count.recordset[0].Total + 1;

    const invoiceNumber = "INV-2025-26-" + String(next).padStart(6, "0");

    // CREATE INVOICE

    const invoice = await sql.query`


INSERT INTO Invoices


(

InvoiceNumber,

JobID,

TotalAmount,

PaymentMode,

TaxableAmount,

CGST,

SGST,

IGST,

TaxAmount,

GrandTotal

)


OUTPUT INSERTED.InvoiceID


VALUES


(

${invoiceNumber},

${JobID},

${taxableAmount},

${PaymentMode},

${taxableAmount},

${cgst},

${sgst},

${igst},

${gstAmount},

${grandTotal}

)


`;

    const invoiceID = invoice.recordset[0].InvoiceID;

    // ITEMS SAVE

    for (let item of charges.recordset) {
      let gst = Number(item.GSTPercent || 18);

      let gstValue = (Number(item.Amount) * gst) / 100;

      await sql.query`


INSERT INTO InvoiceItems


(

InvoiceID,

Description,

Amount,

HSN_SAC,

GSTPercent,

GSTAmount

)


VALUES


(

${invoiceID},

${item.Description},

${item.Amount},

${item.SACCode || ""},

${gst},

${gstValue}

)


`;
    }

    // CUSTOMER DATA

    const customer = await sql.query`


SELECT

Customers.Name,

Customers.Mobile


FROM Customers


INNER JOIN RepairJobs


ON Customers.CustomerID = RepairJobs.CustomerID


WHERE RepairJobs.JobID=${JobID}


`;

    // PDF GENERATE

    const pdfPath = generateInvoicePDF({
      InvoiceNumber: invoiceNumber,

      CustomerName: customer.recordset[0].Name,

      Mobile: customer.recordset[0].Mobile,

      items: charges.recordset.map((item) => ({
        Description: item.Description,

        Amount: item.Amount,

        GSTPercent: item.GSTPercent || 18,

        GSTAmount: (Number(item.Amount) * (item.GSTPercent || 18)) / 100,
      })),

      TaxableAmount: taxableAmount,

      CGST: cgst,

      SGST: sgst,

      GrandTotal: grandTotal,

      PaymentMode: PaymentMode,
    });

    res.json({
      message: "Invoice Created",

      InvoiceNumber: invoiceNumber,

      PDF: pdfPath,

      TaxableAmount: taxableAmount,

      GST: gstAmount,

      CGST: cgst,

      SGST: sgst,

      GrandTotal: grandTotal,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getInvoice = async (req, res) => {
  try {
    const invoice = await sql.query`

SELECT *

FROM Invoices

WHERE InvoiceID=${req.params.invoiceID}

`;

    const items = await sql.query`

SELECT *

FROM InvoiceItems

WHERE InvoiceID=${req.params.invoiceID}

`;

    res.json({
      invoice: invoice.recordset[0],

      items: items.recordset,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createInvoice,

  getInvoice,
};
