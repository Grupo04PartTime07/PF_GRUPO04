import React, { useEffect } from "react";
import styles from "./modalReviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { getReviews } from "../../redux/actions/get_reviews";
import { cleanReviews } from "../../redux/actions/clean_reviews";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: "400px",
  bgcolor: "whitesmoke",
  border: "none",
  borderRadius: "5px",
  boxShadow: 0,
  p: 4,
  overflowY: "auto",
};

export default function ModalReviews({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(getReviews(id));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(cleanReviews({}));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Didmount and DidUpdate controlled
    //window.scrollTo(0, 0)
    dispatch(getReviews(id));
    return () => {
      dispatch(cleanReviews({}));
    };
  }, [dispatch]);

  const productDetails = useSelector((state) => state.reviews);
  
  // let stars = [];
  // for (let i = 0; i < Math.ceil(productDetails.score); i++) {
  //     stars.push(<StarRoundedIcon />)
  // }
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#1976d2",
    },
    "& .MuiRating-iconHover": {
      color: "#154bbf",
    },
  });

  return (
    <div>
      <p className={styles.linkModal} onClick={handleOpen} variant="contained">
        Ver más opiniones
      </p>
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
            <Typography sx={style} id="transition-modal-description">
              <h1 className={styles.opinionTitle}>Opiniones</h1>
              <div className={styles.opinionCard}>
                <div className="opinionModalContainer detailMargin">
                  {productDetails.scores &&
                    productDetails.scores.map((e) => {
                      // let starsOpinion = [];
                      // for (let i = 0; i < Math.ceil(e.score); i++) {
                      //     starsOpinion.push(<StarRoundedIcon />)
                      // }
                      return (
                        <div>
                          {/* <span className={styles.opinionContainerSpan }>{starsOpinion}</span> */}
                          <StyledRating
                            defaultValue={e.score}
                            precision={0.5}
                            readOnly
                            icon={<StarRoundedIcon fontSize="inherit" />}
                            emptyIcon={
                              <StarBorderRoundedIcon fontSize="inherit" />
                            }
                            sx={{ margin: "15px" }}
                          />
                          <p className={styles.detailDescription}>{e.coment}</p>
                        </div>
                      );
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
