import axios from 'axios';
const { BACK_URL } = process.env

export function getNameProduct(name) {
    return async function (dispatch) {
        var json = await axios(`${BACK_URL}/products?name=` + name);
        return dispatch({
            type: "GET_NAME_PRODUCT",
            payload: json.data
        })
    }
}