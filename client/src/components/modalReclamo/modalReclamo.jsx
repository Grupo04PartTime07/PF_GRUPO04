import React, { useState } from "react";
import {Modal, TextField, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


/*const useStyles = makeStyles((theme)=> ({
modal: {
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
  },
  textfield:{
      width: "100%"
  }


}))
*/
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

    //const styles = useStyles();
    
    
   
    const [motivos, setMotivos] = useState("")
    const [coments, setComents] = useState("")
    
    

    
    const handleOnChange = (e) => {
        setMotivos(e.target.value)
        }
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
            <option >Problema con algunos productos</option>
            <option>Problema con la entrega</option>
            <option>Problema de facturacion</option>
            <option>Otros motivos</option>
            </select>

            <h3 className="CommentTitle">Agrega un comentario</h3>
            <textarea name="coment" type="text" maxlength="300" className="commentTextarea" value={coments} onChange={(e)=>setComents(e.target.value)}/>
            <p className="commentLength">{coments.length}/300</p>
            
            <div align="right">
            <Button onClick={{}}>Enviar</Button>
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