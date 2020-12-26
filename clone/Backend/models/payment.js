const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    paymentID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    userID: {
        type: String,
        required: true,
        trim: true
    },
    cardNo: {
        type: String,
    },
    expiryDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);