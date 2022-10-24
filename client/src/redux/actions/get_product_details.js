export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
const { BACK_URL } = process.env


export const getProductDetails = (id) => dispatch => {
    return fetch(`https://pfproduction-production.up.railway.app/products/${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_PRODUCT_DETAILS, payload: obj}))
    .catch(err => console.log(err))
    } 
    