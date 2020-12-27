const express= require('express');

const router= express.Router();

const asyncexpressHandler   =   require('express-async-handler');

const Product = require('../models/product');
const User = require('../models/user');

const data = require('../data');
const expressAsyncHandler = require('express-async-handler');

const fileUpload  = require('../utils/fileUpload');
const isAuth = require('../utils/Auth');
const product = require('../models/product');
router.get('/',asyncexpressHandler(async(req,res)=>{
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword, //it match the regular expression of other data
            $options: 'i', // i means case insensitive
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }:{_id: -1}
      // console.log("ID" ,req.query.sortOrder)
    
      const products = await Product.find({ ...category, ...searchKeyword }).sort(
        sortOrder
      );
      res.send(products);
}))


router.get('/seed',asyncexpressHandler(async(req,res)=>{
    //await Product.remove({})
    const createdProduct= await Product.insertMany(data.products);

    res.send({createdProduct})
}))

router.get('/:id',asyncexpressHandler(async(req,res)=>{
    const product= await Product.findById(req.params.id);
    if(product)
    {
        res.send(product)
    }
    else{
        res.status(404).send({message:"Product not found"})
    }
}))

router.post(
  '/upload',
  isAuth,
   fileUpload.single('image'),

 
  expressAsyncHandler(async(req,res)=>{
  
    const createdProduct = new Product ({ 
    name:req.body.name,
    image: req.file.path,
    description: req.body.description,
  
    price: req.body.price,
    category:req.body.category,
   
    creator: req.user._id
  }) 
    console.log("PAth", req.file.path)
   console.log("creator", req.body.creator)
  let user
  user = await User.findById(req.user._id);
  if(!user)
  {
    res.status(404).send({message :"user not found "})
  }


user.products.push(createdProduct)
    const CreatedProduct = await createdProduct.save();
    console.log("Request.body" , req.body)
    console.log("place is created ", CreatedProduct)
    console.log("users",user)
    res.status(201).json({ product: createdProduct });
  })
  
  )

router.get('/user/:userid' ,

expressAsyncHandler(async(req,res)=>{
  let product;  
  console.log("REQ>BOFT", req.body , req.params)
  const userId =  req.params.userid;
  console.log("userid",userId)
   product = await Product.find({creator: userId})
   console.log("product",product)
   if (!product || product.length==0) {
    res.send({Message :"No product found"})
    }
  
    res.status(201).send(product)}))



module.exports=router