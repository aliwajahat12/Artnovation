const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false, required: true },
    products:  [{ type: mongoose.Types.ObjectId, required: true, ref: 'Products' }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema)