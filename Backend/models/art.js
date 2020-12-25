const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const artSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    artID: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    type: {
        type: String,
        enum: ['physical', 'digital'],
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Art', artSchema);