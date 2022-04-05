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

export async function HttpGetVendorByID(vendorID) {

    const response = await axios.get(vendorURL(vendorID))
    return response
}

export {
    httpGetVendors,
}