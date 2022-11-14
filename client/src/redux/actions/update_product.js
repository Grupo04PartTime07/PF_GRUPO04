
import axios from "axios"

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const updateProduct = (id,payload) => dispatch => {
    return axios.put(`${BACK_URL}/products/${id}`,payload)
    .then(res => dispatch({type: UPDATE_PRODUCT, payload: res.data}) )
    .catch(err => console.log(err))
    }

  