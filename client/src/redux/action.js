export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";


export const orderByPrice = (order) =>{
    return { type: ORDER_BY_PRICE, payload: order}
}

export const getAllProducts = () => dispatch => {;
    return fetch('http://localhost:3001/products') 
    .then(res => res.json()) 
    .then(obj => dispatch({type: GET_ALL_PRODUCTS, payload: obj}))
    .catch(err => console.log(err))
    }