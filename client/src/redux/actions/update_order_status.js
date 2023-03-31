import axios from "axios"

export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const updateOrderStatus = (payload) => dispatch => {
    console.log("Payload UpdateStatus:", payload)
    return axios.put(`https://backend-henrymarket.onrender.com/orders/`,payload)
    .then(res => dispatch({type: UPDATE_ORDER_STATUS, payload: res.data}) )
    .catch(err => console.log(err))
    }

    //Mandar mensaje del back si status:"Entregada"---> "Gracias por confirmar la recepcion de su compra"
    //Mandar mensaje del back si status:"Cancelada"---> "Su compra se ha cancelado "