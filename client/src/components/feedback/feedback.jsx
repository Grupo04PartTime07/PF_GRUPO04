import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import './feedback.css'

export default function Feedback(){
    
    const info = {
        payment_id:
        50847220348,
        status:"approved",
        payment_type: "credit_card",
        merchant_order_id:"6267534713"
    }
    
    return(
        <div className="feedbackContainer">
            <div className="feedbackContent">
                <img src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png' alt='Henry Logo'></img>
                {info.status === 'approved' ? <div className="feedbackMessage">
                    ¡Gracias por tu compra!
                    <p>Tu código de seguimiento es <b>{info.merchant_order_id}</b></p>
                </div> : <div className="feedbackMessage">
                    ¡Algo salió mal!
                    <p>Te invitamos a probar nuevamente</p>
                </div>}
                <div>
                    <Link to='/' className="feedbackButton"><Button variant="contained">Volver a Henry Market</Button></Link>
                </div>
            </div>
        </div>
    )
}