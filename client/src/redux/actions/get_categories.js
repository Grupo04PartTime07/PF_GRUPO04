export const GET_CATEGORIES = "GET_CATEGORIES";

export const filterByCategory = () => dispatch => {;
    return fetch('http://localhost:3001/categories') 
    .then(res => res.json()) 
    .then(arr => dispatch({type: GET_CATEGORIES, payload: arr}))
    .catch(err => console.log(err))
    }