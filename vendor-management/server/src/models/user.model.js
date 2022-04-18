const { default: mongoose } = require('mongoose')
const userDatabase = require('./customer')
const stripe = require('stripe')('sk_test_51KpRU9SBeIeQYzIiqAVHThiuqtKV2kLZy1SLEeMSvyMIKsygSVZceHYlVATY42okNzWxujSaojdRnVShu6Hhu08w00rcRDKFZH');
const {v4: uuidv4} = require('uuid');
const {addOrderToVendor} = require('./vendors.model')
async function getUserbyUsername(username) {

    return await userDatabase.findOne({ username: username })
}

async function getCartByUsername(username) {

    const response = await userDatabase.findOne({ username: username }).select({ cart: 1 })
    return response
}

async function addItemToCart(username, data) {

    // cart.push(itemToAdd)

    const { item } = data
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
                "cart.items": {
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

async function deleteItemFromCart(username, itemid) {

    const response = await userDatabase.findOneAndUpdate({ username: username },
        {
            $pull: {
                "cart.items": {
                    itemID: mongoose.Types.ObjectId(itemid)
                }
            }
        }, { new: true }).clone()

    return response;
}

async function createLineItems(cart) {

    const items = cart['items']
    let products = []
    let prices = []
    let line_items = []
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const product = await stripe.products.create({
            name: item.itemName,
            metadata: {
                quantity: parseInt(1),
                price: parseInt(item.itemPrice)*100
            }
        });

        products.push(product)
    }

    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const price = await stripe.prices.create({

            unit_amount: product.metadata.price,
            currency: 'inr',
            product: product["id"],
            metadata: { quantity: product.metadata.quantity }
        })

        prices.push(price)
    }

    prices.forEach((price) => {
        const line_item = {
            price: price.id,
            quantity: parseInt( price.metadata.quantity), 
        }
        line_items.push(line_item)
    })

    console.log(line_items)
    return line_items

}

async function placeOrder(token, amount, cart, user){

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
    })

    console.log("Cusomter Logged");

    const payment = await stripe.paymentIntents.create({
        amount: amount*100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email
    },
    {
        idempotencyKey: uuidv4()
    })


    if(payment){

        //* Add new order to customer orders

        const orderID = new mongoose.Types.ObjectId();

        const order = {

            orderID: orderID,
            vendorID: cart.vendorID,
            items: cart['items'],
            orderStatus: "In-Progress",
            totalAmount: amount*100
        }

        console.log(order)

        let response = await userDatabase.findOneAndUpdate({ username: user.username },
            {
                $push: {
                    "orderList": {
                        orderID: orderID,
                        vendorID: cart.vendorID,
                        items: cart['items'],
                        orderStatus: "In-Progress",
                        totalAmount: amount
                    }
                }
            }, { new: true }).clone()

        // //* Delete items from cart
        const customerID = response["_id"].toString()

        response = await userDatabase.findOneAndUpdate({username: user.username}, {
            $set: {
                "cart.items": []
            }
        }, { new: true }).clone()

        // //* Add order vendor side
        
        response = await addOrderToVendor(cart.vendorID, order, customerID);

        return response;
    }
    else{
        console.log("Payment Failed")
    }
}

module.exports = {
    getUserbyUsername,
    addItemToCart,
    getCartByUsername,
    deleteItemFromCart,
    createLineItems,
    placeOrder
}