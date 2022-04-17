const { default: mongoose } = require('mongoose')
const userDatabase = require('./customer')

async function getUserbyUsername(username){

    return await userDatabase.findOne({username: username})
}

async function getCartByUsername(username){

    const response =  await userDatabase.findOne({username: username}).select({cart: 1})
    return response
}

async function addItemToCart(username, data){

    // cart.push(itemToAdd)
    
    const {item} = data
    const newItem = item['item']
    const vendorID = item['vendorID']
    console.log("Logging Vendor ID to insert", vendorID)
    console.log("Logging item to insert", newItem)
    const response = await userDatabase.findOneAndUpdate({ username: username },
        {  
            $set: {
                vendorID: mongoose.Types.ObjectId(vendorID)
            },

            $push: {
                "cart.items" : {
                    itemID: new mongoose.Types.ObjectId(),
                    itemName: newItem.itemName,
                    itemDescription: newItem.itemDescription,
                    itemPrice: newItem.itemPrice,
                    isVeg: newItem.isVeg,
                }
            },
        }, { new: true }
    ).clone()

    console.log(response)
    return response
}

async function deleteItemFromCart(username, itemid){

    const response = await userDatabase.findOneAndUpdate({ username: username },
        {
            $pull: {
                "cart.items": {
                    itemID: mongoose.Types.ObjectId(itemid)
                }
            }
        }, {new: true}).clone()
        
    return response;
}

module.exports = {
    getUserbyUsername,
    addItemToCart,
    getCartByUsername,
    deleteItemFromCart,
}