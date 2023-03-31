export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const getProductDetails = (id) => dispatch => {
    return fetch(`https://backend-henrymarket.onrender.com/products/${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_PRODUCT_DETAILS, payload: obj}))
    .catch(err => console.log(err))
    } 
    