export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";

export const filterByCategory = (category) => dispatch => {;
    return fetch(`http://localhost:3001/products?category=${category}`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: FILTER_BY_CATEGORY, payload: arr}))
    .catch(err => console.log(err))
    }