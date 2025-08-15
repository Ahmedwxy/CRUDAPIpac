const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a user name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a user email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);