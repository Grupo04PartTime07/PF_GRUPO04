import axios from "axios"

export const CREATE_NEW_PRODUCTS = "NEW_PRODUCTS";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const createNewProducts = (payload) => dispatch => {
    return axios.post(`https://backend-henrymarket.onrender.com/products`,payload)
    .then(res => dispatch({type: CREATE_NEW_PRODUCTS, payload: res.data}) )
    .catch(err => console.log(err))
    }