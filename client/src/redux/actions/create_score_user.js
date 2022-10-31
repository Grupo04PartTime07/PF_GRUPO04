
export const CREATE_SCORE_USER = "CREATE_SCORE_USER";

const { BACK_URL = 'http://localhost:3001' } = process.env

export const createScoreUser = (payload) => dispatch => {
    console.log("Paypoad:",payload)
    return fetch(`${BACK_URL}/scoreUser`,{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})
    .then(res => res.json())
    .then(res => dispatch({type: CREATE_SCORE_USER, payload: res}) )
    .catch(err => console.log(err))
    }