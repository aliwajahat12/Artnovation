const mongoose = require('mongoose');

const order_itemSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    artID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    itemID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    quantity: {
        type: Number,
    },

}, { timestamps: true });

userSchema.virtual('password').set(function(password){
    this.hash_pass = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_pass);
    }
}

module.exports = mongoose.model('order_item', order_itemSchema);