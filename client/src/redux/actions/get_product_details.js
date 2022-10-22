export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";


export const getProductDetails = (id) => dispatch => {
    return fetch(`http://localhost:3001/products/${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_PRODUCT_DETAILS, payload: obj}))
    .catch(err => console.log(err))
    }
    