export const GET_USER_DETAIL_TOKEN = "GET_USER_DETAIL_TOKEN";
const { BACK_URL = 'http://localhost:3001' } = process.env

// id == email
export const getUserDetailToken = (email, token) => dispatch => {
    //console.log("Payload:",payload)
    return fetch(`https://backend-henrymarket.onrender.com/users`,{
        method: "POST", 
        headers: {'Content-Type': 'application/json', authorization: `Bearer ${token}`}, 
        body: JSON.stringify({email:email})})
    .then(res => res.json())
    .then(obj => dispatch({type: GET_USER_DETAIL_TOKEN, payload: obj}))
    .catch(err => console.log(err))
    }

        