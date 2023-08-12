require("dotenv/config");
require("./db");
const express = require("express");

const app = express();

require("./config")(app);

app.get("/", (req, res) => res.redirect("/docs"));


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const projectRoutes = require("./routes/cohort.routes");
app.use("/api", projectRoutes);

const studentsRoutes = require("./routes/student.routes");
app.use("/api", studentsRoutes);

require("./error-handling")(app);

module.exports = app;
