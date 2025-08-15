const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUserProfile } = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddleware");

// @desc Register a new user
// @route POST /api/users/register
// @access Public
router.post("/", registerUser);

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
router.post("/login", loginUser);

// @desc Get user data
// @route GET /api/users/profile
// @access Private 
router.get("/profile",protect, getUserProfile);

module.exports = router;