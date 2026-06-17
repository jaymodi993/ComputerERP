const { sql } = require("../config/db");

const updateStatus = async (req, res) => {
  try {
    const { JobID, Status, Remark } = req.body;

    await sql.query`

UPDATE RepairJobs

SET Status=${Status}

WHERE JobID=${JobID}

`;

    await sql.query`

INSERT INTO RepairStatusHistory

(
JobID,
Status,
Remark
)

VALUES

(
${JobID},
${Status},
${Remark}
)

`;

    res.json({
      message: "Status Updated",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getStatusHistory = async (req, res) => {
  try {
    const result = await sql.query`

SELECT *

FROM RepairStatusHistory

WHERE JobID=${req.params.jobID}

ORDER BY CreatedDate ASC

`;

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  updateStatus,

  getStatusHistory,
};
