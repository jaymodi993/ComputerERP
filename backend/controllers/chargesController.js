const { sql } = require("../config/db");

const addCharge = async (req, res) => {
  try {
    const { JobID, Description, Amount } = req.body;

    await sql.query`

INSERT INTO RepairCharges

(
JobID,
Description,
Amount
)

VALUES

(
${JobID},
${Description},
${Amount}
)

`;

    res.json({
      message: "Charge Added",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCharges = async (req, res) => {
  try {
    const result = await sql.query`

SELECT *

FROM RepairCharges

WHERE JobID=${req.params.jobID}

`;

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addCharge,

  getCharges,
};
