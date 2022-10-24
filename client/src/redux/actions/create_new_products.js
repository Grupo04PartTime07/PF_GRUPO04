import axios from "axios"

export const CREATE_NEW_PRODUCTS = "NEW_PRODUCTS";
const { BACK_URL } = process.env

export const createNewProducts = (payload) => dispatch => {
    return axios.post(`https://pfproduction-production.up.railway.app/products`,payload)
    .then(res => dispatch({type: CREATE_NEW_PRODUCTS, payload: res.data}) )
    .catch(err => console.log(err))
    }