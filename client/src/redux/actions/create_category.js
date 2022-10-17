//import axios from "axios"

export const CREATE_CATEGORY = "CREATE_CATEGORY";

export const createCategory = (payload) => dispatch => {
    console.log("Paypoad:",payload)
    return fetch("http://localhost:3001/categories",{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})
    .then(res => res.json())
    .then(res => dispatch({type:CREATE_CATEGORY, payload: res}) )
    .catch(err => console.log(err))
    }