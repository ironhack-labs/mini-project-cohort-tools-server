// BONUS
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/Project.model");
const Student = require("../models/Student.model");

//  POST /api/projects  -  Creates a new project
router.post("/projects", (req, res, next) => {
  const {
    name,
    description,
    projectUrl1,
    projectUrl2,
    projectUrl3,
    image,
    students,
    tags,
  } = req.body;

  Project.create({
    name,
    description,
    projectUrl1,
    projectUrl2,
    projectUrl3,
    image,
    students,
    tags,
  })
    .then((newProject) => res.status(201).json(newProject))
    .catch((err) => res.status(500).json(err));
});

//  GET /api/projects/students/:studentId -  Retrieves all of the projects for a given student
router.get("/projects/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Find project by student id in the projectCreators array
  Project.find({ projectCreators: studentId })
    .populate("projectCreators")
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json(err));
});

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(projectId)
    .populate("projectCreators")
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(500).json(error));
});

// Create a route(s) for updating a project, allowing to add or remove students from the projectCreators array. Keep the routes RESTful and use the correct HTTP verbs.
//  PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.status(200).json(updatedProject))
    .catch((error) => res.status(500).json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(projectId)
    .then(() => {
      res
        .status(200)
        .json({
          message: `Project with ${projectId} was deleted successfully.`,
        });
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
