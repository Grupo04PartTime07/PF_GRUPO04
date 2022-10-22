export const GET_CATEGORIES = "GET_CATEGORIES";

export const getCategories = () => dispatch => {;
    return fetch('https://pfproduction-production.up.railway.app/categories') 
    .then(res => res.json()) 
    .then(arr => dispatch({type: GET_CATEGORIES, payload: arr}))
    .catch(err => console.log(err))
    }
