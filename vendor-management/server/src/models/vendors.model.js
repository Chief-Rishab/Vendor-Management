const vendorsDatabase = require('./vendors.mongo')
const mongoose = require('mongoose')


async function addVendor(vendor){

    await vendorsDatabase.findOneAndUpdate({
        outletName: vendor.outletName,
    }, vendor, {
        upsert: true,
    })
}


async function getVendors() {

    return await vendorsDatabase.find({})

}

async function getVendorByID(vendorID){


    console.log(mongoose.Types.ObjectId.isValid(vendorID));
    return await vendorsDatabase.findById(vendorID)
}

async function addOrderToVendor(vendorID, order, customerID){

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $push: {
            "orderList": {
                customerID: customerID,
                orderID: order.orderID,
                items: order['items'],
                orderStatus: "In-Progress",
                totalAmount: order.totalAmount,
            }
        }
    }).clone();
    

    return response;
}

module.exports = {
    getVendors,
    getVendorByID,
    addOrderToVendor,
}