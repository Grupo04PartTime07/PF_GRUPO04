import axios from 'axios';
export const SEARCH_FOR_USERS = 'SEARCH_FOR_USERS'
const { BACK_URL = 'http://localhost:3001' } = process.env

export function searchForInventory(email) {
    if(email !== ""){
    return async function (dispatch) {
        var json = await axios(`https://backend-henrymarket.onrender.com/users?email=` + email);
        return dispatch({
            type: SEARCH_FOR_USERS,
            payload: json.data
        })
    }
}else{
    return { type: "default"}
}
}

