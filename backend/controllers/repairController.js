const { sql } = require("../config/db");
const generateRepairPDF = require("../utils/pdfGenerator");

const addRepairJob = async (req, res) => {
  try {
    const { CustomerID, DeviceType, Brand, Model, SerialNumber, Problem } = req.body;

    const counter = await sql.query`

SELECT LastNumber

FROM JobCounter

WHERE FinancialYear='2025-26'

`;

    let nextNumber = counter.recordset[0].LastNumber + 1;

    await sql.query`

UPDATE JobCounter

SET LastNumber=${nextNumber}

WHERE FinancialYear='2025-26'

`;

    const jobNumber = "SI-2025-26-" + String(nextNumber).padStart(6, "0");

    await sql.query`

        INSERT INTO RepairJobs
        (
            CustomerID,
            JobNumber,
            DeviceType,
            Brand,
            Model,
            SerialNumber,
            Problem
        )

        VALUES
        (
            ${CustomerID},
            ${jobNumber},
            ${DeviceType},
            ${Brand},
            ${Model},
            ${SerialNumber},
            ${Problem}
        )

        `;
    const customerData = await sql.query`

SELECT 

Customers.Name,
Customers.Mobile

FROM Customers

WHERE CustomerID=${CustomerID}

`;

    const pdfPath = generateRepairPDF({
      JobNumber: jobNumber,

      Name: customerData.recordset[0].Name,

      Mobile: customerData.recordset[0].Mobile,

      DeviceType,

      Brand,

      Model,

      SerialNumber,

      Problem,
    });

    res.json({
      message: "Repair Job Created",

      JobNumber: jobNumber,

      PDF: pdfPath,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getRepairJobs = async (req, res) => {
  try {
    const result = await sql.query`

        SELECT 

        RepairJobs.*,

        Customers.Name,
        Customers.Mobile


        FROM RepairJobs

        INNER JOIN Customers

        ON RepairJobs.CustomerID = Customers.CustomerID


        `;

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addRepairJob,

  getRepairJobs,
};
