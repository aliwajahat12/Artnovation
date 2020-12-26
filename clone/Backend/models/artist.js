const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    bio: {
        type: String,
        max: 100
    },
    contact_num: {type: String},
    profile_pic: {type: String}

}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);