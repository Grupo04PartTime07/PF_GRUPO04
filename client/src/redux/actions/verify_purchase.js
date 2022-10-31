import axios from "axios"

export const VERIFY_PURCHASE = "VERIFY_PURCHASE";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const verifyPurchase = (payload) => dispatch => {
    return axios.get(`${BACK_URL}/feedback`,payload)
        .then(res => dispatch({type: VERIFY_PURCHASE, payload: res.data}) )
        .catch(err => console.log(err))
    }