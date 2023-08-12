const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cohort = require("../models/Cohort.model");


//  POST /api/cohorts  -  Creates a new cohort
router.post("/cohorts", (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
  } = req.body;

  Cohort.create({
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


//  GET /api/cohorts -  Retrieves all of the cohorts
router.get("/cohorts", (req, res, next) => {
  // Dynamically create the query object
  const query = {};
  if (req.query.campus) query.campus = req.query.campus;
  if (req.query.program) query.program = req.query.program;
  
  Cohort.find(query)
    .then((allCohorts) => res.json(allCohorts))
    .catch((err) => res.json(err));
});


//  GET /api/cohorts/:cohortId -  Retrieves a specific cohort by id
router.get("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findById(cohortId)
    .then((cohort) => res.status(200).json(cohort))
    .catch((error) => res.json(error));
});


// PUT  /api/cohorts/:cohortId  -  Updates a specific cohort by id
router.put("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => res.json(updatedCohort))
    .catch((error) => res.json(error));
});


// DELETE  /api/cohorts/:cohortId  -  Deletes a specific cohort by id
router.delete("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findByIdAndRemove(cohortId)
    .then(() =>
      res
      .status(200)
      .json({ message: `Cohort with ${cohortId} was deleted successfully.`})
    )
    .catch((error) => res.json(error));
});

module.exports = router;

