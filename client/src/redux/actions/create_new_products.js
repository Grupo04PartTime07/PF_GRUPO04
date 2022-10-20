import axios from "axios"

export const CREATE_NEW_PRODUCTS = "NEW_PRODUCTS";

export const createNewProducts = (payload) => dispatch => {
    return axios.post("http://localhost:3001/products",payload)
    .then(res => dispatch({type: CREATE_NEW_PRODUCTS, payload: res.data}) )
    .catch(err => console.log(err))
    }