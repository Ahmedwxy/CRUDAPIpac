const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { model } = require("mongoose");

// Middleware to protect routes
// This middleware checks if the user is authenticated by verifying the JWT token.
// If the token is valid, it retrieves the user from the database and attaches it to the request object.
// If the token is not provided or invalid, it responds with a 401 Unauthorized status.
// @desc Protect routes
// @route GET /api/users/profile
// @access Private
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
    

})

module.exports = { protect };