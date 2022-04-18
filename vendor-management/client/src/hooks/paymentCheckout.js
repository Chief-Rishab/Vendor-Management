const axios = require('axios');

const API_ENDPOINT = "http://localhost:8000/customer/:username/cart"

// export default async function initiateCheckout(cart){

//     const URL = API_ENDPOINT + '/create-checkout-session'
//     const response = await axios.post(URL, {cart});
//     console.log(response)
//     const body = response.data;
//     window.location.href = body.url
// }

export default async function placeOrder(token, amount, cart, user){

    const URL = API_ENDPOINT + '/order'
    console.log("User", user)
    const response = await axios.post(URL, {token, amount, cart, user})
    console.log(response)
}