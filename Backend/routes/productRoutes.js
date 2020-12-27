const express = require('express');
const router = express.Router();
const asyncexpressHandler = require('express-async-handler');
const Product = require('../models/product');
const data = require('../data');
const expressAsyncHandler = require('express-async-handler');
const fileUpload = require('../utils/fileUpload');
const isAuth = require('../utils/Auth');
var multer = require('multer');
var cloudinary = require('cloudinary').v2;

//multer
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

//cloudinary
cloudinary.config({
  cloud_name: 'dyxwsyf37',
  api_key: '713659325974775',
  api_secret: '_3hGHgTPtgdNzEJ3nlld9SSBkGk'
});



router.get('/', asyncexpressHandler(async (req, res) => {
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
      : { price: -1 } : { _id: -1 }
  console.log("ID", req.query.sortOrder)

  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(products);
}))

router.get("/edit/:id", function (req, res) {
  Product.findById({ _id: req.params.id }, function (err, retProduct) {
    if (err) { res.send(err.message); }
    else {

      // Do your thing here..

      // res.send({ retProduct });
    }
  });

});

router.post("/edit/:id", function (req, res) {
  Product.findById({ _id: req.params.id }, function (err, retProduct) {
    if (err) { res.send(err.message); }
    else {
      retProduct.name= req.body.name;
      retProduct.description= req.body.description;
      retProduct.price= req.body.price;
      retProduct.category= req.body.category;
      retProduct.countInStock= req.body.countInStock;
      retProduct.rating= req.body.rating;
      retProduct.numReviews= req.body.numReviews;
      
      // image: result.secure_url,
      // creator: req.user._id

        // retProduct.name = req.body.name,
        // retProduct.description = req.body.description,
        // retProduct.image = req.body.image,
        // retProduct.price = req.body.price
    }
    retProduct.save(function (err, updatedProduct) {
      if (err) { res.send(err.message); }
      else {

        //do your thing here

        // res.render("/art/artist");
      }
    });
  });
});


router.get("/delete/:id", function (req, res) {
  Product.deleteOne({ _id: req.params.id }, function (err, retPost) {
      if (err) {
          res.send(err);
      }
      else {

          // Your Thing

          // res.redirect("/art/artist");
      }
  });

});

router.get('/seed', asyncexpressHandler(async (req, res) => {
  //await Product.remove({})
  const createdProduct = await Product.insertMany(data.products);

  res.send({ createdProduct })
}))

router.get('/:id', asyncexpressHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product)
  }
  else {
    res.status(404).send({ message: "Product not found" })
  }
}))

router.post(
  '/upload',
  isAuth,
  upload.single('image'),
  // fileUpload.single('image'),
  expressAsyncHandler(async (req, res) => {
    console.log('In Function');
    cloudinary.uploader.upload(req.file.path, function (err, result) {
      if (err) { console.log("Error  " +err); }
      console.log("Success: "+result);
      const createdProduct = new Product({
        name: req.body.name,
        // image: req.file.path,
        image: result.secure_url,

        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        creator: req.user._id
      })
      console.log("PAth", req.file.path)
      console.log("creator", req.body.creator)

      const CreatedProduct = createdProduct.save();
      console.log("Request.body", req.body)
      console.log("place is created ", CreatedProduct)
      res.send({
        _id: CreatedProduct._id,
        name: CreatedProduct.name,
        image: CreatedProduct.path,
        description: CreatedProduct.description,

        price: CreatedProduct.price,
        category: CreatedProduct.category,
        countInStock: CreatedProduct.countInStock,
        rating: CreatedProduct.rating,
        numReviews: CreatedProduct.numReviews
      })
    })
  })

)


module.exports = router