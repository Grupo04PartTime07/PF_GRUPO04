import React, { useState } from "react";
import {Modal, Button} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import emailjs from '@emailjs/browser';

import styles from "./modalReclamo.module.css";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: '400px',
    bgcolor: 'whitesmoke',
    border: 'none',
    borderRadius: '5px',
    boxShadow: 0,
    p: 4,
    overflowY: 'auto',
  };

  
  
export default function ModalReclamo(props) {

    const [motivos, setMotivos] = useState("")
    const [coments, setComents] = useState("")
    
    const handleOnChange = (e) => {
        setMotivos(e.target.value)
        }


    const handleSubmit = (e) =>{
        let templateParams = {
            reclamo: props.id,
            message: coments,
            motivos: motivos
          };
        
        let templateParamsClient = {
            reclamo: props.id,
            email: props.userEmail,
            
          };

          emailjs.send('service_m2i6vur', 'reclamo', templateParams, 'SQ418bEG_ax1lvJbG')
          .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
             console.log('FAILED...', error);
          });
          
          emailjs.send('service_m2i6vur', 'reclamoCliente', templateParamsClient, 'SQ418bEG_ax1lvJbG')
          .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
             console.log('FAILED...', error);
          });
          props.closeModal()
    }

    function handleDisabled() {
        return (
                !motivos ||
                !coments)
                };


    const body=(
        <div >
            <div align="center">
                <h2 className="CommentTitle">Inicia tu reclamo</h2>
            </div>
            <label className="CommentTitle">Email: {props.userEmail}</label>
            <br/>
            <label className="CommentTitle">Orden: {props.id}</label>
            <br/>
            <label className="CommentTitle">Motivos: </label> 
             <select  name="motivos"id="motivos"  defaultValue="" 
              onChange={(e)=>handleOnChange(e)}
             >
            <option disabled value="" >Elije una opcion</option>  
            <option >Problema con algun producto</option>
            <option>Problema con la entrega</option>
            <option>Problema de facturacion</option>
            <option>Problema con la suma de puntos</option>
            <option>Otros motivos</option>
            </select>
            <br/>
            <br/>
            <div align="center">
            <h3 className="CommentTitle">Agrega un comentario</h3>
            <textarea  name="coment" type="text" maxlength="300" className="commentTextarea" value={coments} onChange={(e)=>setComents(e.target.value)}/>
            <p className="commentLength">{coments.length}/300</p>
            </div>
            <div align="center">

            <button className={styles.button} disabled = {handleDisabled()} onClick={(e) => handleSubmit(e)}>Enviar</button>
            <button className={styles.button} onClick={()=>props.closeModal() }>Cancelar</button>

            </div>

        </div>
    )




return (
    <div className="app">
    <Modal
    open={props.modal}
    onClose={props.closeModal}
    >
    <Box sx={style}>
    <Typography sx={style} id="transition-modal-description" >
     {body}
     </Typography>
    </Box>
    </Modal>
    </div>
)
}