import mongoose from 'mongoose';

const axios = require('axios');

const API_ENDPOINT = "http://localhost:8000/customer"
const VENDOR_ENDPOINT = "http://localhost:8000/vendor"
// export default async function initiateCheckout(cart){

//     const URL = API_ENDPOINT + '/create-checkout-session'
//     const response = await axios.post(URL, {cart});
//     console.log(response)
//     const body = response.data;
//     window.location.href = body.url
// }

export default async function placeOrder(token, amount, cart, user){

    let response = await axios.get(`http://localhost:8000/customer/${user.username}`)
    const custID = response.data._id;

    response = await axios.get(`${VENDOR_ENDPOINT}/${cart.vendorID}/menu`)
    const vendorName = response.data.outletName;
    const newOrderID = new mongoose.Types.ObjectId();
    response = await axios.post(`${API_ENDPOINT}/${user.username}/cart/order`, {token, amount, cart, user, vendorName, newOrderID})

    response = await axios.post(`${VENDOR_ENDPOINT}/${cart.vendorID}/orders`, { cart, custID, newOrderID, amount})

    return response;
}