

import axios from "axios"

export const UPDATE_USER_ADMIN = "UPDATE_USER_ADMIN";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const userUpdate = (payload) => dispatch => {
    //console.log("desde user update")
    //console.table(payload);
    return axios.put(`https://backend-henrymarket.onrender.com/users/admin/`,payload)
    .then(res => dispatch({type: UPDATE_USER_ADMIN, payload: res.data}) )
    .catch(err => console.log(err))
    }
