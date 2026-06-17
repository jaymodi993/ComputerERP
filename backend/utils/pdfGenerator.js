const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateRepairPDF = (data) => {
  const fileName = `Repair_${data.JobNumber}.pdf`;

  const filePath = `./uploads/jobsheets/${fileName}`;

  if (!fs.existsSync("./uploads/jobsheets")) {
    fs.mkdirSync("./uploads/jobsheets", {
      recursive: true,
    });
  }

  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
  });

  doc.pipe(fs.createWriteStream(filePath));

  // HEADER

  doc.fontSize(20).text("COMPUTER REPAIR SERVICE", {
    align: "center",
  });

  doc.fontSize(9).text(
    `
Laptop | Desktop | Accessories | Sales | Repair

Address: ___________________________
Mobile: ___________________________

`,
    {
      align: "center",
    },
  );

  doc.moveDown(0.5);

  // TITLE BOX

  doc.rect(40, 150, 515, 35).stroke();

  doc.fontSize(15).text("REPAIR JOB CARD", 40, 160, {
    align: "center",
    width: 515,
  });

  doc.moveDown(3);

  // JOB NUMBER BOX

  doc.rect(40, 210, 515, 45).stroke();

  doc.fontSize(12).text(
    `
Job Number : ${data.JobNumber}

Status : RECEIVED

`,
    55,
    220,
  );

  doc.moveDown(2);

  // CUSTOMER SECTION

  doc.fontSize(12).text("CUSTOMER DETAILS");

  doc.moveDown(0.3);

  doc.fontSize(10).text(
    `
Name       : ${data.Name}

Mobile     : ${data.Mobile}

`,
  );

  doc.moveDown(1);

  // DEVICE SECTION

  doc.fontSize(12).text("DEVICE DETAILS");

  doc.fontSize(10).text(
    `
Device     : ${data.DeviceType}

Brand      : ${data.Brand}

Model      : ${data.Model}

Serial No  : ${data.SerialNumber}

`,
  );

  doc.moveDown(1);

  // PROBLEM BOX

  doc.fontSize(12).text("CUSTOMER COMPLAINT");

  doc.rect(40, 430, 515, 70).stroke();

  doc.fontSize(10).text(data.Problem, 55, 450, {
    width: 480,
  });

  // FOOTER

  doc.fontSize(9).text(
    `
Received Date:
${new Date().toLocaleDateString()}


Customer Signature                 Owner Signature


______________                    ______________



                 SHOP STAMP


                 _____________



Thank you for trusting us.

`,
    40,
    530,
  );

  doc.end();

  return filePath;
};

module.exports = generateRepairPDF;
