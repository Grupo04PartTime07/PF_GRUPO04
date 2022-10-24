export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
const { BACK_URL } = process.env

export const filterByCategory = (category) => dispatch => {;
    return fetch(`https://pfproduction-production.up.railway.app/products?categorie=${category}`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: FILTER_BY_CATEGORY, payload: arr}))
    .catch(err => console.log(err))
    }