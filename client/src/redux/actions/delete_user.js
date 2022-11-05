import axios from "axios"

export const DELETE_USER = "DELETE_USER";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const deleteUser = (email) => dispatch => {
    return axios.delete(`${BACK_URL}/users/${email}`)
    .then(res => dispatch({type: DELETE_USER, payload: res.data}) )
    .catch(err => console.log(err))
    }
