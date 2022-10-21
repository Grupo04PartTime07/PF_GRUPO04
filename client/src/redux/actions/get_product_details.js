export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";


export const getProductDetails = (id) => dispatch => {
    return fetch(`http://localhost:3001/products/${id}`)
    .then(res => res.json())
    .then(obj => dispatch({type: GET_PRODUCT_DETAILS, payload: obj}))
    .catch(err => console.log(err))
    }
    // Cuando se cree el componente CardDetails:
    // sacar el id de la url con useParams dentro del useEffect (como Didmount)
    // dispatch la action getProductDetails(id) dentro del useEffect
    // usar un useEffect (como willUnmount) con la action cleanProductState dentro para limpiar
    // el estado 