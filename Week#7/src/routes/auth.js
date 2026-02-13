const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");

// Registration endpoint
// Now mounted under /api in app.js, so full path = /api/register
router.post("/register", registerUser);

module.exports = router;
