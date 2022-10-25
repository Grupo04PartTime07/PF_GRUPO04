const CHECK_OUT = "CHECK_OUT"
const { BACK_URL } = process.env

export const checkOutCart = (payload) => dispatch => {
    console.log("Payload:",payload)
<<<<<<< HEAD
    return fetch(`https://pfproduction-production.up.railway.app/checkout`,{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})
=======
    return fetch(`${BACK_URL}/checkout`,{
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(payload)})
>>>>>>> 08897a0eec483c1f8216854486acb654a934b852
    .then(res => res.json())
    .then(res => window.location.replace(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${res.pref_id}`))
    .catch(err => console.log(err))
    }

    