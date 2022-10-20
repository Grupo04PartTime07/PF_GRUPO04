
import axios from "axios"

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const updateProduct = (id,payload) => dispatch => {
    return axios.put(`http://localhost:3001/products/${id}`,payload)
    .then(res => dispatch({type: UPDATE_PRODUCT, payload: res.data}) )
    .catch(err => console.log(err))
    }