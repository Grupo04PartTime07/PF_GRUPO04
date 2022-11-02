import axios from "axios"

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const updateCategory = (payload) => dispatch => {
    return axios.put(`${BACK_URL}/categories`,payload)
    .then(res => dispatch({type: UPDATE_CATEGORY, payload: res.data}) )
    .catch(err => console.log(err))
    }
