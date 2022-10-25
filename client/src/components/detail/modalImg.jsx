import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CardMedia from '@mui/material/CardMedia';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: '400px',
  bgcolor: 'white',
  border: 'none',
  borderRadius: '5px',
  boxShadow: 0,
  p: 4,
  overflowY: 'auto',
};

const styleImg = {
    width: 400,
    height: '400px',
    position: 'relative',
    top: '-7%',
    left: '10%',
}

export default function ModalImg({img}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <img className='detailImagen' onClick={handleOpen} src={img} alt="productos" />
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
        <Fade in={open}>
          <Box sx={style}>
            <CardMedia sx={styleImg} id="transition-modal-description" >
                <img src={img} id="transition-modal-description"/>
            </CardMedia>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}