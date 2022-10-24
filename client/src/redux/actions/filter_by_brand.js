export const FILTER_BY_BRAND = "FILTER_BY_BRAND";
const { BACK_URL } = process.env

export const filterByBrand = (brand) => dispatch => {;
    return fetch(`https://pfproduction-production.up.railway.app/products?brand=${brand}`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: FILTER_BY_BRAND, payload: arr}))
    .catch(err => console.log(err))
    }