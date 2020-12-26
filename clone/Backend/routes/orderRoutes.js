const express= require('express');

const expressAsyncHandler= require('express-async-handler');
const Order = require('../models/order');
const  isAuth   = require('../utils/Auth');
console.log("isAuth",isAuth)
const orderRouter = express.Router();





orderRouter.get("/mine", 
 isAuth, 
 expressAsyncHandler( async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  // console.log("user",user);
  res.send(orders);
}));



orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
   console.log("Body of order", req.body)
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else 
    {
    
      const order = new Order({
        orderItems: req.body.orderItems,
         Shippinginfo: req.body.Shippinginfo,
         paymentMethod: "Cash on Delivery",
         itemsPrice: req.body.itemsPrice,
         shippingPrice: req.body.shippingPrice,
      
         totalPrice: req.body.totalPrice,
         user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);


orderRouter.get('/:id',
isAuth,
expressAsyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id);
  if(order)
  {
    res.send(order)
  }
  else{
    res.status(404).send({message:"The order is not found"})
  }
})
)



module.exports = orderRouter