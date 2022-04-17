const { default: mongoose } = require('mongoose');
const {getUserbyUsername, addItemToCart, getCartByUsername, deleteItemFromCart} = require('../../models/user.model')

async function HttpGetUserbyUsername(req, res){
    const userName = req.params.username
    return res.send(await getUserbyUsername(userName))
}

async function HttpGetUserCart(req, res){

    const username = req.params.username;
    return res.send(await getCartByUsername(username));
}

async function HttpAddItemToCart(req, res){

    const userName = req.params.username;
    const data = req.body
    const response = await addItemToCart(userName, data)
    return res.send(response)

}

async function HttpGetItemFromCart(req, res){

    const username = req.params.username;
    let cart = await getCartByUsername(username)
    cart = cart['cart']['items'];
    let filtered = cart.filter(item => item.itemID.toString() == req.params.id)
    console.log(filtered)
    return res.send(filtered[0])
}

async function HttpRemoveItemFromCart(req, res){

    const username = req.params.username;
    const itemID = req.params.id;
    const response = await deleteItemFromCart(username, itemID).then((response) =>{
        return response});
    console.log("Response inside HTTP Backend Delete Function", response);
    res.send(response)
}

module.exports = {
    HttpGetUserbyUsername,
    HttpGetUserCart,
    HttpAddItemToCart,
    HttpRemoveItemFromCart,
    HttpGetItemFromCart
}