const {getVendors} = require('../../models/vendors.model')

async function HttpGetAllVendors(req, res){
    return res.send(await getVendors())
}

module.exports = {
    HttpGetAllVendors,
}


