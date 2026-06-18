const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateInvoicePDF = (data) => {
  const fileName = `Invoice_${data.InvoiceNumber}.pdf`;

  const filePath = `./uploads/invoices/${fileName}`;

  if (!fs.existsSync("./uploads/invoices")) {
    fs.mkdirSync("./uploads/invoices", {
      recursive: true,
    });
  }

  const doc = new PDFDocument({
    size: "A4",

    margin: 40,
  });

  doc.pipe(fs.createWriteStream(filePath));

  // HEADER

  doc.fontSize(18).text("COMPUTER REPAIR SERVICE", {
    align: "center",
  });

  doc.fontSize(10).text(
    `
GSTIN: _______________________

Address: _____________________

Mobile: ______________________

`,
    {
      align: "center",
    },
  );

  doc.moveDown();

  doc.fontSize(15).text("TAX INVOICE", {
    align: "center",
    underline: true,
  });

  doc.moveDown();

  // CUSTOMER

  doc.fontSize(11).text(
    `
Invoice No:
${data.InvoiceNumber}


Customer Name:
${data.CustomerName}


Mobile:
${data.Mobile}


Date:
${new Date().toLocaleDateString()}


`,
  );

  // ITEMS

  doc.fontSize(12).text("ITEM DETAILS");

  doc.moveDown(0.5);

  data.items.forEach((item) => {
    doc.fontSize(10).text(
      `
${item.Description}

Amount:
₹ ${item.Amount}

GST:
${item.GSTPercent}%

GST Amount:
₹ ${item.GSTAmount}

----------------------------

`,
    );
  });

  // TOTAL

  doc.fontSize(12).text(
    `
Taxable Amount:
₹ ${data.TaxableAmount}


CGST:
₹ ${data.CGST}


SGST:
₹ ${data.SGST}



TOTAL AMOUNT:

₹ ${data.GrandTotal}



Payment Mode:

${data.PaymentMode}


`,
  );

  doc.moveDown();

  doc.fontSize(10).text(
    `
Customer Signature              Owner Signature


______________                  ______________



Thank you for your business.

`,
  );

  doc.end();

  return filePath;
};

module.exports = generateInvoicePDF;
