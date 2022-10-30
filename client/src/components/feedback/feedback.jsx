import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import './feedback.css'

export default function Feedback(){
    
    const comprador = {
        name:"bernardo broscheit",
        email:"bernardo.broscheit@gmail.com"
    }

    const info = {
        payment_id:
        50847220348,
        status:"approved",
        payment_type: "credit_card",
        merchant_order_id:"6267534713"
    }

    function mailerExitoso(){
        var templateParams = {
          name: comprador.name,
          email: comprador.email,
          tracking: comprador.merchant_order_id,
          date:"30/10/2022" // aca iria la fecha de compra si se puede conseguir
        };
       
        emailjs.send('service_gd3iwqs', 'pagoExitoso', templateParams, 'Seri2s2LqtIOz95kh')
          .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
             console.log('FAILED...', error);
          });
    }

    function mailerFailed(){
        var templateParams = {
          name: comprador.name,
          email: comprador.email,
          tracking: comprador.merchant_order_id,
          date:"30/10/2022" // aca iria la fecha de compra si se puede conseguir
        };
       
        emailjs.send('service_gd3iwqs', 'pagoErroneo', templateParams, 'Seri2s2LqtIOz95kh')
          .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
             console.log('FAILED...', error);
          });
    }

    useEffect(() => {
        if(info.status === "approved"){
            mailerExitoso()
        }else{
            mailerFailed()
        }
        
    }, []);
    
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