
export const CREATE_CATEGORY = "CREATE_CATEGORY";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const createCategory = (payload) => dispatch => {
    console.log("Paypoad:",payload)
    return fetch(`https://backend-henrymarket.onrender.com/categories`,{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})
    .then(res => res.json())
    .then(res => dispatch({type:CREATE_CATEGORY, payload: res}) )
    .catch(err => console.log(err))
    }