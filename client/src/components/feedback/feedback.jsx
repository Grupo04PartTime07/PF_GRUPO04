import React from "react";
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import emailjs from '@emailjs/browser';
import './feedback.css'
import axios from 'axios';
import { verifyPurchase } from "../../redux/actions/verify_purchase";
import {useAuth0} from '@auth0/auth0-react';
import { deleteCart } from '../../redux/actions/delete_cart';


const { BACK_URL = 'http://localhost:3001' } = process.env
export default function Feedback(){
    
    const history = useHistory()
    //payment_id, status, payment_type, merchant_order_id
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const payment_id = urlParams.get('payment_id')
    const status = urlParams.get('status')
    const payment_type = urlParams.get('payment_type')
    const merchant_order_id = urlParams.get('merchant_order_id')
    const dispatch = useDispatch()
    const { user, isAuthenticated, getAccessTokenSilently  } = useAuth0();
    let currentUser = "Guest"
    if(user && user.email) currentUser = user.email
    
    // let navbarUser = JSON.parse(window.localStorage.getItem(`userName`))
    //let navbarEmail = JSON.parse(window.localStorage.getItem(`userEmail`))
    
    const comprador = {
        name:  user && user.name,
        email: user && user.email,
        merchant_order_id: merchant_order_id
    }

    async function callProtectedApiToken2(){
        try{
          const token = await getAccessTokenSilently();
          const response = await axios.post(`${BACK_URL}/users` , {
                name: user.name || " " , 
                email: user.email
            },{headers:{
            authorization:`Bearer ${token}`,
          }});
          user.isAdmin = response.data.userRegisted.isAdmin;
          user.isBanned = response.data.userRegisted.isAdmin;
          window.localStorage.setItem(`p${user.email}`, user.isAdmin)
        }catch(error) {
          console.log(error);
        }
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

    // function updateStorage(user, cart){
    //     let updatedCart = JSON.stringify(cart);
    //     window.localStorage.setItem(user, updatedCart)
    // }   


    React.useEffect(() => {
    dispatch(verifyPurchase({payment_id, status, payment_type, merchant_order_id}))
    },[])

    React.useEffect(() => {
        
        if(status === "approved"){
            mailerExitoso()
        }else{
            mailerFailed()
        }
        window.scrollTo(0, 0)
        if (isAuthenticated){
            return () => {
                const usuario = callProtectedApiToken2();
                console.log(usuario);
            }
        }
        // dispatch(deleteCart())
        // updateStorage(`c${currentUser}`, [])

    }, [dispatch, user]);
    
    return(
        <div className="feedbackContainer">
            <div className="feedbackContent">
                <img src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png' alt='Henry Logo'></img>
                {status === 'approved' ? <div className="feedbackMessage">
                    ¡Gracias por tu compra {user && user.given_name}!
                    <p>Tu código de seguimiento es <b>{merchant_order_id}</b></p>
                </div> : status === 'null' ? history.push('/') : <div className="feedbackMessage">
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
