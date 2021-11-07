import axios from 'axios';

function GetProduct(id) {
    if (typeof id === 'undefined') return undefined
    return get(id, 'Products/GetProduct/')
}

function GetProducts() {
    return get("", 'Products/GetProduct/')
}

function GetCustomer(id) {
    if (typeof id === 'undefined') return undefined
    return get(id, 'Customers/GetCustomer/')
}

function GetCustomers() {
    return get("", 'Customers/GetCustomer/')
}

function GetStore(id) {
    if (typeof id === 'undefined') return undefined
    return get(id, 'Stores/GetStore/')
}

function GetStores() {
    return get("", 'Stores/GetStore/')
}

function GetSale(id) {
    if (typeof id === 'undefined') return undefined
    return get(id, 'Sales/GetSales/')
}

function GetSales() {
    return get("", 'Sales/GetSales/')
}

export { GetProduct, GetCustomer, GetStore, GetSale, GetProducts, GetCustomers, GetStores, GetSales }

const get = async (id, url) => {
    let result = undefined
    await axios.get(`${url}${id}`, {
    }).then(({ data }) => {
        result = data
    }).catch(error => {
        if (error.response.headers['content-type'] === 'text/plain') {
            console.log(error.response.data);
        } else
            if (error.response) {
                console.log(error)
                console.log(error.response)
                Object.values(error.response.data.errors).forEach(e => {
                    console.log(e)
                });
            } else {
                console.log('Error', error.message);
            }
    })
    return result
}

