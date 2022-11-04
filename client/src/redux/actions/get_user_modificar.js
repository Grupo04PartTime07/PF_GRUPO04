export const GET_USER_MODIFICAR = "GET_USER_MODIFICAR";
const { BACK_URL = 'http://localhost:3001' } = process.env

// id == email
export const getUserModificar = (id) => dispatch => {
    return fetch(`${BACK_URL}/users/${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_USER_MODIFICAR, payload: obj}))
    .catch(err => console.log(err));
 
    } 
    