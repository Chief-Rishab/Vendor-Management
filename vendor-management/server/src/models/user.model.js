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
    
    const { item } = data
    const response = await userDatabase.findOneAndUpdate({ username: username },
        {
            $push: {
                cart: {
                    itemID: new mongoose.Types.ObjectId(),
                    itemName: item.itemName,
                    itemDescription: item.itemDescription,
                    itemPrice: item.itemPrice,
                    isVeg: item.isVeg,
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
                cart: {
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