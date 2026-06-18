const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

const customerRoutes = require("./routes/customer");
const repairRoutes = require("./routes/repair");
const statusRoutes = require("./routes/status");
const chargeRoutes = require("./routes/charges");
const invoiceRoutes = require("./routes/invoice");
const fileRoutes = require("./routes/file");
const whatsappRoutes = require("./routes/whatsapp");
const dashboardRoutes = require("./routes/dashboard");

connectDB();

app.get("/", (req, res) => {
  res.send("Computer ERP Backend Running");
});

app.use("/api/customers", customerRoutes);
app.use("/api/repair", repairRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/charges", chargeRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
