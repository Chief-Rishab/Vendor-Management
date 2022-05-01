const { default: mongoose, mongo, Mongoose } = require('mongoose')
const userDatabase = require('./customer')
const stripe = require('stripe')('sk_test_51KpRU9SBeIeQYzIiqAVHThiuqtKV2kLZy1SLEeMSvyMIKsygSVZceHYlVATY42okNzWxujSaojdRnVShu6Hhu08w00rcRDKFZH');
const { v4: uuidv4 } = require('uuid');
const { addOrderToVendor, getVendorByID } = require('./vendors.model')
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
    console.log("Logging itemID to insert", newItem.itemID)
    const newID = mongoose.Types.ObjectId(newItem.itemID);
    const response = await userDatabase.findOneAndUpdate({ username: username },
        {
            $set: {
                "cart.vendorID": vendorID
            },

            $push: {
                "cart.items": {
                    itemID: new mongoose.Types.ObjectId(),
                    itemKey: newID,
                    itemName: newItem.itemName,
                    itemDescription: newItem.itemDescription,
                    itemPrice: newItem.itemPrice,
                    isVeg: newItem.isVeg,
                    image: newItem.image
                }
            },
        }, { new: true }
    ).clone()

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

async function placeOrder(token, amount, cart, user) {

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
    })

    const payment_method = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number: '378282246310005',
            exp_month: 4,
            exp_year: 2024,
            cvc: '314',
        },
    })

    const payment = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email,
        payment_method: payment_method["id"],

    },
        {
            idempotencyKey: uuidv4()
        })


    if (payment) {

        const paymentIntent = await stripe.paymentIntents.confirm(
            payment["id"],
        );

        //* Add new order to customer orders

        const orderID = new mongoose.Types.ObjectId();
        const orderDate = new Date();    
        const order = {

            orderID: orderID,
            vendorID: cart.vendorID,
            items: cart['items'],
            orderStatus: "In-Progress",
            totalAmount: amount * 100,
            date: orderDate
        }

        let vendor = await getVendorByID(cart.vendorID)



        let response = await userDatabase.findOneAndUpdate({ username: user.username },
            {
                $push: {
                    "orderList": {
                        orderID: orderID,
                        vendorID: cart.vendorID,
                        vendor: vendor.outletName,
                        items: cart['items'],
                        orderStatus: "In-Progress",
                        totalAmount: amount,
                        date: orderDate
                    }
                }
            }, { new: true }).clone()

        // //* Delete items from cart
        const customerID = response["_id"].toString()

        response = await userDatabase.findOneAndUpdate({ username: user.username }, {
            $set: {
                "cart.items": []
            }
        }, { new: true }).clone()

        // //* Add order vendor side

        response = await addOrderToVendor(cart.vendorID, order, customerID);

        return response;
    }
    else {
        console.log("Payment Failed")
    }
}

async function getCustomerOrders(username){

    const response = await userDatabase.findOne({username: username}).clone();
    console.log(response);
    return response["orderList"];
}



async function updateCustomerOrderStatus(username, orderID){

    const newID = mongoose.Types.ObjectId(orderID)
    console.log(username, newID)

    const response = await userDatabase.findOneAndUpdate({username: username, "orderList.orderID": newID}, {
        $set: {
            "orderList.$.orderStatus": "Completed",
        }
    }, {new: true});
    console.log(response);
    return response;
}

module.exports = {
    getUserbyUsername,
    addItemToCart,
    getCartByUsername,
    deleteItemFromCart,
    placeOrder,
    getCustomerOrders,
    updateCustomerOrderStatus
}