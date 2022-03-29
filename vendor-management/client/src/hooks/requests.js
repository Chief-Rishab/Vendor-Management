const API_URL = 'http://localhost:8000'

async function httpGetVendors(){

    const response = await fetch(`${API_URL}/vendors`)
    return await response.json()
}

export {
    httpGetVendors,
}