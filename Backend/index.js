const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// var firebase = require("firebase/app");
// require("firebase/storage");


//Parsing the request containing the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes= require('./routes/productRoutes');
const orderRoutes =require('./routes/orderRoutes')

//environment variables
env.config();

//MongoDB connection
//mongodb+srv://root-admin:<password>@cluster0.taayt.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/artgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}
).then(() => {
    console.log('Database connected');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


// //Initialize Firebase
// var firebaseConfig = {
//   apiKey: "AIzaSyB1Z7Cju1Lt9HKw1hC_03hVlkdahy2h43I",
//   authDomain: "artnovation-d57e9.firebaseapp.com",
//   projectId: "artnovation-d57e9",
//   storageBucket: "artnovation-d57e9.appspot.com",
//   messagingSenderId: "143112097093",
//   appId: "1:143112097093:web:bba0b2684d8adc3fc6822c",
//   measurementId: "G-ENPXKX8V3J"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


app.use('/api/user', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes)


app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use((err, req, res, next) => {  //Error Catcher Middleware
    res.status(500).send({ message: err.message });
  });

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});