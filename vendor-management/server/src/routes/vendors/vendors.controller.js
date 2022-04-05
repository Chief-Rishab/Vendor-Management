const {getVendors, getVendorByID} = require('../../models/vendors.model')

async function HttpGetAllVendors(req, res){
    return res.send(await getVendors())
}

async function HttpGetVendorByID(req, res){

    const vendorID = req.params.id
    console.log("Backend", vendorID)

    return res.send(await getVendorByID(vendorID))
}

module.exports = {
    HttpGetAllVendors,
    HttpGetVendorByID
}


