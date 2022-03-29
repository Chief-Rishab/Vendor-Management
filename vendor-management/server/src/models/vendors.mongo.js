const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({

    outletName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gstNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0,
        required:false
    },
    orderList:{
        type:[Object],
        default:[],
        required:false
    },
    menu:{
        type:[Object],
        default:[],
        required:false
    },
})

module.exports = mongoose.model("Vendor", vendorSchema);