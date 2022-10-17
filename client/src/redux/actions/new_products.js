import axios from "axios"

export const NEW_PRODUCTS = "NEW_PRODUCTS";

export const newProducts = (payload) => dispatch => {
    return axios.post("http://localhost:3001/products",payload)
    .then(res => dispatch({type: NEW_PRODUCTS, payload: res.data}) )
    .catch(err => console.log(err))
    }