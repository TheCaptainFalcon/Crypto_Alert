const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserModel = mongoose.model("users", userSchema);