    const express = require("express");
    const router = express.Router();

    const { registerUser, loginUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword } = require("../controllers/user.controller");
    const { protect } = require("../middleware/authMiddleware");
    const upload = require("../middleware/uploadMiddleware");
    const { updateMany } = require("../models/user.model");


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

    // @desc Update user profile
    // @route PUT /api/users/profile
    // @access Private
    router.put("/profile", protect, upload.single('profilePicture'), updateUserProfile);

    // @desc forgot password
    // @route POST /api/users/forgotpassword
    // @access Public
    router.post('/forgotpassword', forgotPassword);

    // @desc reset password
    // @route PUT /api/users/resetpassword/:token
    // @access Public
    router.put('/resetpassword/:token', resetPassword);


    module.exports = router;