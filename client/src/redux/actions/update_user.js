import axios from "axios"

export const UPDATE_USER = "UPDATE_USER";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const clientUpdate = (payload) => dispatch => {
    console.log("desde client update")
    console.table(payload);
    return axios.put(`${BACK_URL}/users`,payload)
    .then(res => dispatch({type: UPDATE_USER, payload: res.data}) )
    .catch(err => console.log(err))
    }
