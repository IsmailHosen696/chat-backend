const mongoose = require('mongoose');

const UserSchyma = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchyma)