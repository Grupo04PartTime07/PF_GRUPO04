import axios from "axios"

export const DELETE_CATEGORY = "DELETE_CATEGORY";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const deleteCategory = (id) => dispatch => {
    return axios.delete(`https://backend-henrymarket.onrender.com/categories?id=${id}`)
    .then(res => dispatch({type: DELETE_CATEGORY, payload: res.data}) )
    .catch(err => console.log(err))
    }
