export const FILTER_BY_BRAND = "FILTER_BY_BRAND";

export const filterByBrand = (brand) => dispatch => {;
    return fetch(`http://localhost:3001/products?brand=${brand}`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: FILTER_BY_BRAND, payload: arr}))
    .catch(err => console.log(err))
    }