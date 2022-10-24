export const GET_BRANDS = "GET_BRANDS";
const { BACK_URL } = process.env

export const getBrands = () => dispatch => {;
    return fetch(`${BACK_URL}/brands`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: GET_BRANDS, payload: arr}))
    .catch(err => console.log(err))
    }
