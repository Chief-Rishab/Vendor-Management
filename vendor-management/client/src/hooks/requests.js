import axios from "axios"

const API_URL = 'http://localhost:8000'

async function httpGetVendors() {

    const { data: response } = await axios.get(`${API_URL}/vendors`) //use data destructuring to get data from the promise object
    // console.log("HDFSDF",response);
    return response;

}

function vendorURL(vendorID) {

    return `${API_URL}/vendors/${vendorID}`
}

function userURL(username) {
    return `${API_URL}/customer/${username}`
}


export async function HttpGetVendorByID(vendorID) {

    const response = await axios.get(vendorURL(vendorID))
    return response
}


async function HttpGetUserByUsername(username) {
    const response = await axios.get(userURL(username)).then((response) => {
        return response.data
    })
    return response
}

async function HttpAddItemToCart(username, item) {
    let userEndpoint = userURL(username)
    userEndpoint = userEndpoint + "/cart"
    console.log("Inside HTTP Function to add Item: ", {item})
    const response = await axios.post(userEndpoint, {
        item,
    }).then((response) => {
        return response
    })
    return response
}

async function deleteItemFromCart(username, itemID){

    let userEndpoint = userURL(username)
    userEndpoint = userEndpoint + `/cart/${itemID}`
    const response = await axios.delete(userEndpoint)
    console.log("Inside requests delete function", response)
    return response    
}

export {
    httpGetVendors,
    HttpGetUserByUsername,
    HttpAddItemToCart,
    deleteItemFromCart
}