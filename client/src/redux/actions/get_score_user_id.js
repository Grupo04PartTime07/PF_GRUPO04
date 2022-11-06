export const GET_SCORE_USER_ID = "GET_SCORE_USER_ID";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const getScoreUserId = (id) => dispatch => {
    console.log('SOY GET USER ID',id)
    return fetch(`${BACK_URL}/scoreUser/search?id=${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_SCORE_USER_ID, payload: obj}))
    .catch(err => console.log(err))
    } 
    