const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cohortSchema = new Schema({
  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: () => Date.now() + 10*7*24*60*60*1000 },
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 8 * 5 * 9 },
});

module.exports = model("Cohort", cohortSchema);