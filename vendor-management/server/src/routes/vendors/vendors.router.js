const express = require('express')

const {
    HttpGetAllVendors
} = require('./vendors.controller');

const vendorsRouter = express.Router();


vendorsRouter.get('/', HttpGetAllVendors);


module.exports = vendorsRouter;