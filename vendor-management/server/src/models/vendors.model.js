const vendorsDatabase = require('./vendors.mongo')
const mongoose = require('mongoose')

const vendor_1 = {

    outletName: "Poison",
    ownerName: "Garvit",
    phoneNo: "1234567890",
    email: "zeher@gmail.com",
    password: "123456",
    gstNo: "asdfsadfas",
    address: "Hell",
    rating: 0,
    orderList: [],
    menu: []
}

async function addVendor(vendor){

    await vendorsDatabase.findOneAndUpdate({
        outletName: vendor.outletName,
    }, vendor, {
        upsert: true,
    })
}

addVendor(vendor_1);

async function getVendors() {

    return await vendorsDatabase.find({})

}

async function getVendorByID(vendorID){

    console.log(mongoose.Types.ObjectId.isValid(vendorID));
    return await vendorsDatabase.findById(vendorID)
}

module.exports = {
    getVendors,
    getVendorByID,
}