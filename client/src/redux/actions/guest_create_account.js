import axios from "axios"

export const GUEST_CREATE_ACCOUNT = "GUEST_CREATE_ACCOUNT";

export const guestCreateAccount = (payload) => dispatch => {
    return axios.post("http://localhost:3001/user/create",payload)
    .then(res => dispatch({type: GUEST_CREATE_ACCOUNT, payload: res.data}) )
    .catch(err => console.log(err))
    }

