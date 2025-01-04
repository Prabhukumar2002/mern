const mongoose=require('mongoose');

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        requried:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        requried:true
    }
})

const foodModel=mongoose.models.Food || mongoose.model('Food',foodSchema)
module.exports=foodModel