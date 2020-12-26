const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    
        orderItems: [
          {
            name: { type: String, required: true },
            Qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true,
            },
          },
        ],

        Shippinginfo: {
          fullname: { type: String, required: true },
          Address: { type: String, required: true },
          City: { type: String, required: true },
          PostalCode: { type: String, required: true },
          Country: { type: String, required: true },
        },
         paymentMethod: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        // taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
         user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
      },
      {
        timestamps: true,
      }
    );

module.exports= mongoose.model("Order",orderSchema)