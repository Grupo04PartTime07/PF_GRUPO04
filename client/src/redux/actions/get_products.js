export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getAllProducts = () => dispatch => {;
    return fetch('https://pfproduction-production.up.railway.app/products') 
    .then(res => res.json()) 
    .then(obj => dispatch({type: GET_ALL_PRODUCTS, payload: obj}))
    .catch(err => console.log(err))
    }