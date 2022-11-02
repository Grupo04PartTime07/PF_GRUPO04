import axios from "axios"

export const UPDATE_BRAND = "UPDATE_BRAND";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const updateBrand = (payload) => dispatch => {
    return axios.put(`${BACK_URL}/brands`,payload)
    .then(res => dispatch({type: UPDATE_BRAND, payload: res.data}) )
    .catch(err => console.log(err))
    }
