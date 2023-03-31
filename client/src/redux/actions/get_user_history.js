export const GET_USER_HISTORY = "GET_USER_HISTORY";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const getUserHistory = (email) => dispatch => {
    return fetch(`https://backend-henrymarket.onrender.com/orders/user?email=${email}`)    
    .then(res => res.json())
    .then(arr => dispatch({type: GET_USER_HISTORY, payload: arr}))
    .catch(err => console.log(err))
    } 

    