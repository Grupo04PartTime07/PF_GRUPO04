import axios from "axios"

export const DELETE_BRAND = "DELETE_BRAND";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const deleteBrand = (id) => dispatch => {
    return axios.delete(`https://backend-henrymarket.onrender.com/brands?id=${id}`)
    .then(res => dispatch({type: DELETE_BRAND, payload: res.data}) )
    .catch(err => console.log(err))
    }
