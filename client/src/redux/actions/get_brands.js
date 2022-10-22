export const GET_BRANDS = "GET_BRANDS";

export const getBrands = () => dispatch => {;
    return fetch('https://pfproduction-production.up.railway.app/brands') 
    .then(res => res.json()) 
    .then(arr => dispatch({type: GET_BRANDS, payload: arr}))
    .catch(err => console.log(err))
    }
