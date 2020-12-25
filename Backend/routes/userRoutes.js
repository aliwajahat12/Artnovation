const express = require('express');
const ash = require('express-async-handler');
const User = require('../models/user');
const router = express.Router();
const expressAsyncHandler = require( 'express-async-handler');
const data = require('../data');
const bcrypt=require('bcrypt')
const  generateToken =require('../utils/utils');
const isAuth = require('../utils/Auth');


router.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users); //it accepts multiple documents to insert into a collection
    res.send({ createdUsers });
  })
);



router.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log("user",user)
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      console.log(req.body)
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );

  router.post('/signup', expressAsyncHandler(async(req,res)=>{
    const user = new User({
      name : req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,8)
    })
    const createdUser= user.save() //In there i have created a new user
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    })
      
  }));

  router.get('/:id' , 
  expressAsyncHandler(async(req,res)=>{
    const user =await  User.findById(req.params.id);
    if(user)
    {
      res.send(user)
    }
    else{
      res.status(401).send({message:"user is not found"});
    }
  })
  )



  router.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if(user)
      {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.user.password)
        {
          user.password = becrypt.hashSync(req.body.password , 8)
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          isAdmin: updatedUser.isAdmin,
          token:generateToken(updatedUser)
        })
      }
      })
  );
// router.get('/signup', (req, res) =>{
//     User.findOne({ email: res.body.email }).exec((err, user) => {
//         if(user) return res.status(400).json({
//             message: 'User already exists'
//         });

//         const { 
//             firstName,
//             lastName,
//             userID,
//             email,
//             passwaord
//         } = req.body;
//         const _user = new User({
//             firstName,
//             lastName,
//             userID: Math.random().toString(),
//             email : "Abc@123Gmail.com",
//             passwaord
//         });

//         _user.save((err, data) => {
//             if(err){
//                 return res.status(400).json({
//                     message: 'Something went wrong'
//                 });
//             }

//             if(data){
//                 return res.status(201).json({
//                     message: 'User created successfully'
//                 })
//             }
//         })
//     })
// });

module.exports = router;