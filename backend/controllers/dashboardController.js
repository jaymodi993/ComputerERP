const { sql } = require("../config/db");

const dashboardData = async (req, res) => {
  try {
    const customers = await sql.query`

SELECT COUNT(*) as total

FROM Customers

`;

    const jobs = await sql.query`

SELECT COUNT(*) as total

FROM RepairJobs

`;

    const invoices = await sql.query`

SELECT COUNT(*) as total

FROM Invoices

`;

    res.json({
      customers: customers.recordset[0].total,

      jobs: jobs.recordset[0].total,

      invoices: invoices.recordset[0].total,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { dashboardData };
