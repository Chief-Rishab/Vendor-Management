const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const vendorAuthRouter = require('./routes/vendor_register/auth')
const vendorsRouter = require('./routes/vendors/vendors.router')
const CustomerUserRouter =require('./routes/customer_reg/User');
// require('./services/conn');
dotenv.config({path: './config.env'})

const app = express()

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(express.json()); 
app.get('/', (req, res) => {
    res.send()
})
app.use('/vendor/auth', vendorAuthRouter);
app.use('/vendors' ,vendorsRouter)

app.use('/customer',CustomerUserRouter);

module.exports = app;