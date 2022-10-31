import axios from "axios"

export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
const { BACK_URL = 'http://localhost:3001' } = process.env

export const updateOrderStatus = (id,payload) => dispatch => {
    return axios.put(`${BACK_URL}/orders/${id}`,payload)
    .then(res => dispatch({type: UPDATE_ORDER_STATUS, payload: res.data}) )
    .catch(err => console.log(err))
    }

    //Mandar mensaje del back si status:"Entregada"---> "Su compra ha sido actualizada a "Entregada" "
    //Mandar mensaje del back si status:"Cancelada"---> "Su compra ha sido actualizada a "Cancelada" "