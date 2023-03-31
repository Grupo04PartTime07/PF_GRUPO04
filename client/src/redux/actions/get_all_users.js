export const GET_ALL_USERS = "GET_ALL_USERS";
const { BACK_URL } = process.env

export const getAllUsers = () => dispatch => {;
    return fetch(`https://backend-henrymarket.onrender.com/users`) 
    .then(res => res.json()) 
    .then(arr => dispatch({type: GET_ALL_USERS, payload: arr}))
    .catch(err => console.log(err))
    //console.log(payload);
    }
