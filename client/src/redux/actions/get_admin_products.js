import axios from 'axios';
export const GET_ADMIN_PRODUCTS = 'GET_ADMIN_PRODUCTS'
const { BACK_URL = 'http://localhost:3001' } = process.env

export function getAdminProducts() {
    return async function (dispatch) {
        var res = await axios(`https://backend-henrymarket.onrender.com/products`);
        return dispatch({
            type: GET_ADMIN_PRODUCTS,
            payload: res.data
        })
    }
}