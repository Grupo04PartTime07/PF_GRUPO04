const CHECK_OUT = "CHECK_OUT"
const { BACK_URL } = process.env

export const checkOutCart = (payload) => dispatch => {
    console.log("Payload:",payload)
    return fetch(`https://pfproduction-production.up.railway.app/checkout`,{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})
    .then(res => res.json())
    .then(res => dispatch({type:CHECK_OUT, payload: res}) )
    .catch(err => console.log(err))
    }