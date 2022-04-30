const { getVendors,
    getVendorByID,
    getVendorOrders,
    getVendorMenu,
    addItemToMenu,
    deleteItemFromMenu,
    editItemFromMenu,
    getItemFromMenu } = require('../../models/vendors.model')

async function HttpGetAllVendors(req, res) {
    return res.send(await getVendors())
}

async function HttpGetVendorByID(req, res) {

    const vendorID = req.params.id
    console.log("Backend", vendorID)

    return res.send(await getVendorByID(vendorID))
}

async function HttpGetVendorOrders(req, res) {

    const vendorID = req.params.id;

    return res.send(await getVendorOrders(vendorID))
}

async function HttpGetVendorMenu(req, res) {

    const vendorID = req.params.id;

    return res.send(await getVendorMenu(vendorID))
}

async function HttpAddItemToMenu(req, res) {

    const item = req.body
    const vendorID = req.params.id;


    return res.send(await addItemToMenu(vendorID, item))
}

async function HttpDeleteItemFromMenu(req, res) {

    const vendorID = req.params.id
    const {itemKey} = req.body
    return res.send(await deleteItemFromMenu(vendorID, itemKey))
}

async function HttpEditItemFromMenu(req, res) {

    const vendorID = req.params.id
    const itemKey = req.params.itemID
    const item = req.body

    return res.send(await editItemFromMenu(vendorID, itemKey, item))
}

async function HttpGetItemFromMenu (req, res){

    const vendorID = req.params.id;
    const itemKey = req.params.itemID;

    return res.send(await getItemFromMenu(vendorID, itemKey))
}

module.exports = {

    HttpGetAllVendors,
    HttpGetVendorByID,
    HttpGetVendorOrders,
    HttpGetVendorMenu,
    HttpAddItemToMenu,
    HttpDeleteItemFromMenu,
    HttpEditItemFromMenu,
    HttpGetItemFromMenu
}


