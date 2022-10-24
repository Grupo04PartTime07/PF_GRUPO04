import axios from "axios"

export const GUEST_CREATE_ACCOUNT = "GUEST_CREATE_ACCOUNT";
const { BACK_URL } = process.env

export const guestCreateAccount = (payload) => dispatch => {
    return axios.post(`https://pfproduction-production.up.railway.app/user/create`,payload)
    .then(res => dispatch({type: GUEST_CREATE_ACCOUNT, payload: res.data}) )
    .catch(err => console.log(err))
    }

