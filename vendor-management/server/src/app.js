const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require("dotenv")
const stripe = require('stripe')('sk_test_51KpRU9SBeIeQYzIiqAVHThiuqtKV2kLZy1SLEeMSvyMIKsygSVZceHYlVATY42okNzWxujSaojdRnVShu6Hhu08w00rcRDKFZH');
const mongoose = require("mongoose")
const vendorAuthRouter = require('./routes/vendor_register/auth')
const vendorsRouter = require('./routes/vendors/vendors.router')
const CustomerUserRouter =require('./routes/customer_reg/User');
// require('./services/conn');
dotenv.config({path: './config.env'})

const app = express()
app.use(cors({
    origin: '*'
  }))
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json()); 
app.get('/', (req, res) => {
    res.send()
})
app.post('/webhook', express.json({type: 'application/json'}), (req, res) => {

    const event = req.body;
    // console.log("Body", req.body)

    switch(event.type){

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // console.log(`PaymentItent for ${paymentIntent.amount} was successful`)
            break;

        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // console.log("Payment Attached")
            break;

        default:
            // console.log(`Unhandled event type ${event.type}`)

    }

    res.send();
})

app.use('/vendor/auth', vendorAuthRouter);
app.use('/vendors' ,vendorsRouter)

// const customer= require('./models/customer');

// //testing with dummy user data for customer
// const custInput ={
//     CustomerName:'Rishab Jain',
//     password:'1234567',
//     phone:873147234,
//     email: 'rockstar@gmail.com'
// }

// const User1=new customer(custInput);
// User1.save((err,document)=>{
//     if(err)
//         console.log(err);
//     console.log(document);
// });

app.use('/customer',CustomerUserRouter);




module.exports = app;