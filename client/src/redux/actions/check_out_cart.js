const CHECK_OUT = "CHECK_OUT"
const { BACK_URL = 'http://localhost:3001' } = process.env

export const checkOutCart = (payload) => dispatch => {
    console.log("Payload:",payload)
    return fetch(`${BACK_URL}/checkout`,{
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(payload)})
    .then(res => res.json())
    .then(res => window.location.replace(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${res.pref_id}`))
    .catch(err => console.log(err))
    }

    