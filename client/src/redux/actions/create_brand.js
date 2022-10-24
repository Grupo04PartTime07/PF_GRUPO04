export const CREATE_BRAND = "CREATE_BRAND";
const { BACK_URL } = process.env

export const createBrand = (payload) => dispatch => {
    console.log("Payload:",payload)
    return fetch(`https://pfproduction-production.up.railway.app/brands`,{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})
    .then(res => res.json())
    .then(res => dispatch({type:CREATE_BRAND, payload: res}) )
    .catch(err => console.log(err))
    }

    // falta ruta router.post para crear brand en el back
    // que mande mensaje si se creo la marca con exito y lo contrario en .json("")
    