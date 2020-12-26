const express = require('express');
const ash = require('express-async-handler');
const User = require('../models/user');
const OTP = require('../models/token');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const bcrypt = require('bcrypt')
const generateToken = require('../utils/utils');
const isAuth = require('../utils/Auth');
var crypto = require('crypto');

const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');

router.get(
    '/seed',
    expressAsyncHandler(async(req, res) => {
        // await User.remove({});
        const createdUsers = await User.insertMany(data.users); //it accepts multiple documents to insert into a collection
        res.send({ createdUsers });
    })
);



router.post(
    '/signin',
    expressAsyncHandler(async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("user", user)
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

router.post('/signup', expressAsyncHandler(async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        isVerified: false,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createdUser = await user.save() //In there i have created a new user


    const tokenObj = new OTP({ _userId: createdUser._id, otp: crypto.randomBytes(16).toString('hex') });
    // console.log(tokenObj);

    // Save the verification token
    const returnToken = await tokenObj.save();
    console.log(returnToken);
    var link = `localhost:5000/api/user/confirmation/${returnToken.otp}`;
    const msg = {
        to: createdUser.email, // Change to your recipient
        from: 'aliwajahat1024@gmail.com', // Change to your verified sender
        subject: 'Account Verification Token', 
        text: tokenObj.otp
    }
    await sgMail
        .send(msg)
        .then(() => {
            res.send("Sent");
            console.log('Email sent')
        })
        .catch((error) => {
            res.send("Error");
            console.error(error)
        });


    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    })

}));

router.post('/confirmation', expressAsyncHandler(async(req, res) => {

console.log("REq", req.body.t )
    var tokenString = req.body.t;
    console.log(tokenString);

    // Find a matching token
    const foundToken = await OTP.findOne({ otp: tokenString });
    console.log("found Token 12",foundToken)
    if (!foundToken) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

    // If we found a token, find a matching user
    const foundUser = await User.findById(foundToken._userId );
  
     console.log("found User",foundUser)
    if (!foundUser) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
    if (foundUser.isVerified) return res.status(400)
   
  .send("copy paste the url    "   +   LINK);
    

    // Verify and save the user
    foundUser.isVerified = true;
    foundUser.save();
    res.status(200).send( "http://localhost:3000/").setHeader("Location", "http://localhost:3000/signin").end();;


}));


// router.post('resend', (req, res) => {
//     req.assert('email', 'Email is not valid').isEmail();
//     req.assert('email', 'Email cannot be blank').notEmpty();
//     req.sanitize('email').normalizeEmail({ remove_dots: false });

//     // Check for validation errors    
//     var errors = req.validationErrors();
//     if (errors) return res.status(400).send(errors);

//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
//         if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

//         // Create a verification token, save it, and send email
//         var code = new OTP({ _userId: user._id, otp: crypto.randomBytes(16).toString('hex') });

//         // Save the token
//         code.save(function(err) {
//             if (err) { return res.status(500).send({ msg: err.message }); }

//             // Send the email
//             // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
//             var mailOptions = { from: 'aliwajahat1024@gmail.com', to: 'aliwajahat1214@gmail.com', subject: 'Account Verification Token', text: 'Hello,\n\n' + otp.otp + ' .\n' };
//             // var mailOptions = { from: 'aliwajahat1024@gmail.com', to: 'aliwajahat1214@gmail.com', subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
//             sgMail.send(mailOptions, function(err) {
//                 if (err) { return res.status(500).send({ msg: err.message }); }
//                 res.status(200).send('A verification email has been sent to ' + user.email + '.');
//             });
//         });

//     });
// });

router.get('/:id',
    expressAsyncHandler(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user)
        } else {
            res.status(401).send({ message: "user is not found" });
        }
    })
)



router.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.user.password) {
                user.password = becrypt.hashSync(req.body.password, 8)
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                password: updatedUser.password,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser)
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

router.post('/verify', (req, res) => {

    const msg = {
        to: 'aliwajahat1214@gmail.com', // Change to your recipient
        from: 'aliwajahat1024@gmail.com', // Change to your verified sender
        subject: 'Test 2',
        text: 'and easy to do anywhere, even with Node.js',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            res.send("Sent");
            console.log('Email sent')
        })
        .catch((error) => {
            res.send("Error");
            console.error(error)
        });
    // res.send(msg);
});

module.exports = router;