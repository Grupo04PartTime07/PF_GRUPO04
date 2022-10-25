import axios from 'axios';
export const SEARCH_FOR_INVENTORY = 'SEARCH_FOR_INVENTORY'
const { BACK_URL = 'http://localhost:3001' } = process.env

export function searchForInventory(name) {
    if(name !== ""){
    return async function (dispatch) {
        var json = await axios(`https://pfproduction-production.up.railway.app/products?name=` + name);
        return dispatch({
            type: SEARCH_FOR_INVENTORY,
            payload: json.data
        })
    }
}else{
    return { type: "default"}
}
}