import React, { useState } from "react";
import {Modal, Button} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

    function handleDisabled() {
        return (
                !motivos ||
                !coments)
                };

    const body=(
        <div >
            <div align="center">
                <h2>Inicia tu reclamo</h2>
            </div>
            <label>Email: {props.userEmail}</label>
            <br/>
            <label>Orden: {props.id}</label>
            <br/>
            <label>Motivos: </label> 
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

            <h3 className="CommentTitle">Agrega un comentario</h3>
            <textarea name="coment" type="text" maxlength="300" className="commentTextarea" value={coments} onChange={(e)=>setComents(e.target.value)}/>
            <p className="commentLength">{coments.length}/300</p>
            
            <div align="right">
            <Button className={styles.bttn} disabled = {handleDisabled()} onClick={{}}>Enviar</Button>
            <Button onClick={()=>props.closeModal() }>Cancelar</Button>
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