import React from "react";
import {Modal, TextField, Button} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from "./modalShippingAddress.module.css";



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

  
  
export default function ModalShippingAddress(props) {

    
    const handleOnChange = (e) => {
        props.setAddress(e.target.value)
        }

    const body=(
        <div >
            
            <div align="center">
                <h2 className={styles.h2}>Confirma tu dirección de envío</h2>
            </div>
            <br/>
            <br/>
            <label className={styles.label}>Nombre y Apellido: {props.user}</label>
            <br/>
            <br/>
            <TextField fullWidth label="Direccion:" id="fullWidth" value={props.address} onChange={handleOnChange}></TextField>
            <div align="center">
            <br/>
            <br/>
            <button className={styles.button} disabled = {!props.address? true : false}onClick={()=>props.handlecheckout()}>Continuar</button>
            <button className={styles.button} onClick={()=>props.closeModal() } variant="contained">Cancelar</button>
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