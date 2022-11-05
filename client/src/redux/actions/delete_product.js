import axios from "axios"

export const DELETE_PRODUCT = "DELETE_PRODUCT";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const deleteProduct = (id) => dispatch => {
    return axios.delete(`${BACK_URL}/products?id=${id}`)
    .then(res => dispatch({type: DELETE_PRODUCT, payload: res.data}) )
    .catch(err => console.log(err))
    }