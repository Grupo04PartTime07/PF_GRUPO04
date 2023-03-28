export const GET_ADMIN_ORDERS = "GET_ADMIN_ORDERS";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const getAdminOrders = () => dispatch => {
    return fetch(`https://backend-henrymarket.onrender.com/orders`)    
    .then(res => res.json())
    .then(obj => dispatch({type: GET_ADMIN_ORDERS, payload: obj}))
    .catch(err => console.log(err))
    } 