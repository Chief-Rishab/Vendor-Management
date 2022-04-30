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

async function getVendorOrders(vendorID){

    const response = await vendorsDatabase.findOne({_id: vendorID});
    console.log(response.orderList);
    return response.orderList;
}

async function getVendorMenu(vendorID){

    const response = await vendorsDatabase.findOne({_id: vendorID});
    console.log(response.menu);
    return response.menu;
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


module.exports = {
    getVendors,
    getVendorByID,
    addOrderToVendor,
    getVendorOrders,
    getVendorMenu,
    addItemToMenu,
    deleteItemFromMenu,
    editItemFromMenu,
    getItemFromMenu
    
}