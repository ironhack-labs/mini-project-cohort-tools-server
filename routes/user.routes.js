const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

// GET  /api/users/:id - Returns the user with the given id
router.get("/users/:id", isAuthenticated, (req, res, next) => {
  User.findById(req.params.id)
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
})

module.exports = router;