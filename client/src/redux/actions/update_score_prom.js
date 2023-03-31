import axios from "axios"

export const UPDATE_SCORE_PROM = "UPDATE_SCORE_PROM";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const updateScoreProm = (id) => dispatch => {
    return axios.put(`https://backend-henrymarket.onrender.com/reviews/${id}`)
    .then(res => dispatch({type: UPDATE_SCORE_PROM, payload: res.data}) )
    .catch(err => console.log(err))
    }