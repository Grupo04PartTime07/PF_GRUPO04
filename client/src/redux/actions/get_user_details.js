export const GET_USER_DETAILS = "GET_USER_DETAILS";
const { BACK_URL = 'http://localhost:3001' } = process.env

// id == email
export const getUserDetails = (id) => dispatch => {
    return fetch(`${BACK_URL}/users/${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_USER_DETAILS, payload: obj}))
    .catch(err => console.log(err));
 
    } 
    