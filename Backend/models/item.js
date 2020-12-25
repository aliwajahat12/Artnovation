const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    dimension: {
        x: {
            type: Number,
            required: true,
            min: 1
        },
        y: {
            type: Number,
            required: true,
            min: 1
        }
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    weight: {
        type: Number,
        min: 1
    }

}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);