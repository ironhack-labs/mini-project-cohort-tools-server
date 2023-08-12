const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Student = require("../models/Student.model");
const Cohort = require("../models/Cohort.model");

const studentsData = require("../data/students.json");

//  POST /api/students  -  Creates a new student
router.post("/students", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
  } = req.body;

  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
  })
    .then((newStudent) => res.json(newStudent))
    .catch((err) => res.json(err));
});

// GET /api/students -  Retrieves all of the students
router.get("/students", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => res.status(200).json(allStudents))
    .catch((err) => res.status(500).json(err));
});

//  GET /api/students/cohort/:cohortId -  Retrieves all of the students for a given cohort
router.get("/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((allStudents) => res.status(200).json(allStudents))
    .catch((err) => res.status(500).json(err));
});

//  GET /api/students/:studentId -  Retrieves a specific student by id
router.get("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => res.status(200).json(student))
    .catch((error) => res.status(500).json(error));
});

// PUT  /api/students/:studentId  -  Updates a specific student by id
router.put("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => res.status(200).json(updatedStudent))
    .catch((error) => res.status(500).json(error));
});

// DELETE  /api/students/:studentId  -  Deletes a specific student by id
router.delete("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findByIdAndRemove(studentId)
    .then(() =>
      res.status(200).json({
        message: `Student with ${studentId} was deleted successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
