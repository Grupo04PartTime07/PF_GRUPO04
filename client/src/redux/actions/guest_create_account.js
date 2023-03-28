import axios from "axios"

export const GUEST_CREATE_ACCOUNT = "GUEST_CREATE_ACCOUNT";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const guestCreateAccount = (payload) => dispatch => {
    return axios.post(`https://backend-henrymarket.onrender.com/user/create`,payload)
    .then(res => dispatch({type: GUEST_CREATE_ACCOUNT, payload: res.data}) )
    .catch(err => console.log(err))
    }

