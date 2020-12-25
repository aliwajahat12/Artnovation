const mongoose = require('mongoose');
const item_order = require('./item_order');

const invoiceSchema = mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    orderItem: {
        type: item_order,
        min: 1,
        default: undefined
    },
    paymentID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    totalBill: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);