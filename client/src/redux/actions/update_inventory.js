import axios from "axios"

export const UPDATE_INVENTORY = "UPDATE_INVENTORY";
const { BACK_URL } = process.env


export const updateInventory = (id,payload) => dispatch => {
    return axios.put(`https://pfproduction-production.up.railway.app/inventory/${id}`,payload)
    .then(res => dispatch({type: UPDATE_INVENTORY, payload: res.data}) )
    .catch(err => console.log(err))
    }
