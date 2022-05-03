const vendorsDatabase = require('./vendors.mongo')
const mongoose = require('mongoose')
const { updateUserOrderStatus } = require('./user.model')
const { lazyrouter } = require('express/lib/application')


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

async function addOrderToVendor(vendorID, order, customerID, newOrderID, amount){

    console.log("Inside Log", vendorID, order, customerID);

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $push: {
            "orderList": {
                customerID: customerID,
                orderID: newOrderID,
                items: order['items'],
                orderStatus: "In-Progress",
                totalAmount: amount,
                date: new Date()
            }
        }
    }).clone();
    

    return response;
}

async function getVendorOrders(vendorID){

    const response = await vendorsDatabase.findOne({_id: vendorID});
    console.log(response.orderList);
    return response.orderList;
}

async function getVendorMenu(vendorID){

    const response = await vendorsDatabase.findOne({_id: vendorID});
    return response;
}

async function addItemToMenu(vendorID, item){

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $push: {

            "menu": {

                itemKey: new mongoose.Types.ObjectId(),
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemDescription: item.itemDescription,
                image: " ",
                isVeg: item.isVeg
            }
        }
    })


    return response;
}

async function deleteItemFromMenu (vendorID, itemKey){

    console.log(itemKey);

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $pull: {
            "menu": {
                itemKey: mongoose.Types.ObjectId(itemKey)
            }
        }
    }, {new: true})

    console.log("Menu", response.menu)

    return response.menu;
}

async function editItemFromMenu(vendorID, itemKey, item){

    console.log(item);

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID, "menu.itemKey": mongoose.Types.ObjectId(item.itemKey)}, {

        $set: {

            "menu.$.itemName": item.itemName,
            "menu.$.isVeg": item.isVeg,
            "menu.$.itemPrice": item.itemPrice,
            "menu.$.itemDescription": item.itemDescription,

        }

    }, {new: true});

    console.log(response);

    return response
}

async function getItemFromMenu(vendorID, itemKey){

    const response = await vendorsDatabase.findOne({_id: vendorID})
    const menu = response['menu'];
    const fetchedItem = menu.filter(item => item.itemKey == mongoose.Types.ObjectId(itemKey));

    return fetchedItem;
}

async function updateOrderStatus(vendorID, orderID){

    const newID = mongoose.Types.ObjectId(orderID)

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID, "orderList.orderID": newID}, {
        $set: {
            "orderList.$.orderStatus": "Completed",
        }
    })

    console.log("Response", response.orderList);
    return response.orderList;
}

function calculateNewRating(orderList){

    let completed = 0;
    let newRating = 0;

    orderList.forEach(order => {
        if(order.orderStatus == "Completed"){
            
            if(order.rating){
                completed += 1;
                newRating += order.rating;
            }
        }
    })

    newRating = newRating/completed;
    return newRating
}

async function updateVendorRating(vendorID, rating, orderID){

    const newID = mongoose.Types.ObjectId(orderID)
    let response = await vendorsDatabase.findOneAndUpdate({_id: vendorID, "orderList.orderID": newID}, {
        $set: {
            "orderList.$.rating": rating,
        }
    }, {new: true}).clone();

    const finalRating = calculateNewRating(response.orderList);
    response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $set: {
            rating: finalRating,
        }
    }, {new: true});

    return response;
    
}


module.exports = {
    getVendors,
    getVendorByID,
    addOrderToVendor,
    getVendorOrders,
    getVendorMenu,
    addItemToMenu,
    deleteItemFromMenu,
    editItemFromMenu,
    getItemFromMenu,
    updateOrderStatus,
    updateVendorRating
    
}