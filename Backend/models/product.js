const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{type: String ,required:true, unique:true},
     image:{type: String ,required:true},
    description:{type: String ,required:true},
    category:{type: String ,required:true},
    price:{type: Number ,required:true},
 
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    
},
{
    timestamps:true,
})

module.exports=mongoose.model("Product",productSchema)