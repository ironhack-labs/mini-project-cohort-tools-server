// BONUS
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectUrl1: { type: String, required: true },
    projectUrl2: { type: String, default: "" },
    projectUrl3: { type: String, default: "" },
    image: { type: String, default: "https://i.imgur.com/15RT6Bs.gif" },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    tags: [String]
});

module.exports = model("Project", projectSchema);