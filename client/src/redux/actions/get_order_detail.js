export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
const { BACK_URL = 'http://localhost:3001' } = process.env


export const getOrderDetail = (id) => dispatch => {
    return fetch(`${BACK_URL}/orders?id=${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_ORDER_DETAIL, payload: obj}))
    .catch(err => console.log(err))
    } 

    
