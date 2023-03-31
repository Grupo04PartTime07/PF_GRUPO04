export const FILTER_BY_BRAND = "FILTER_BY_BRAND";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const filterByBrand = (brand) => dispatch => {;
    return fetch(`https://backend-henrymarket.onrender.com/products?brand=${brand}`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: FILTER_BY_BRAND, payload: arr}))
    .catch(err => console.log(err))
    }