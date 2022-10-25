import React, { useEffect } from "react";
import styles from './modalReviews.module.css';
import { useDispatch, useSelector } from "react-redux";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { getReviews } from '../../redux/actions/get_reviews';
import { cleanProductState } from '../../redux/actions/clean_product_state';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

const scrollBar = {
    
}

export default function ModalReviews({id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()

  useEffect(() => {  // Didmount and DidUpdate controlled
      //window.scrollTo(0, 0)
      dispatch(getReviews(id));
      return(() => {
          dispatch(cleanProductState({}))
      })
  },[dispatch])

  const productDetails = useSelector((state) => state.productdetail)
  let stars = [];
  for (let i = 0; i < Math.ceil(productDetails.score); i++) {
      stars.push(<StarRoundedIcon />)
  }

  return (
    <div>
        <p className='linkToBack' onClick={handleOpen} variant="contained">Más opiniones</p>
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
            <Typography sx={style} id="transition-modal-description" >
                <h1 className={styles.opinionTitle}>Opiniones</h1>
                <div className={styles.opinionCard}>
                    <div className="opinionContainer detailMargin">
                        {productDetails.opiniones && productDetails.opiniones.map((e) => {
                        let starsOpinion = [];
                        for (let i = 0; i < Math.ceil(e.score); i++) {
                            starsOpinion.push(<StarRoundedIcon />)
                        }
                        return (
                            <div >
                                <span className={styles.opinionContainerSpan }>{starsOpinion}</span>
                                <p className={styles.detailDescription}>{e.coment}</p>
                            </div>
                        )
                        })}
                    </div>
                </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}