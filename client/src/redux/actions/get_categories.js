export const GET_CATEGORIES = "GET_CATEGORIES";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const getCategories = () => dispatch => {;
    return fetch(`${BACK_URL}/categories`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: GET_CATEGORIES, payload: arr}))
    .catch(err => console.log(err))
    }
