import React,{useEffect} from "react";
import styles from './reviews.module.css';
import {useDispatch, useSelector} from "react-redux";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { getReviews } from '../../redux/actions/get_reviews';
//import {Link} from "react-router-dom";
import { Button } from "@mui/material";
import { addToCart } from '../../redux/actions/add_to_cart';
import { cleanProductState } from '../../redux/actions/clean_product_state';

export default function Reviews(props){
   
    const dispatch = useDispatch()

    useEffect(() => {  // Didmount and DidUpdate controlled
        //window.scrollTo(0, 0)
        const {id} = props.match.params;
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
        <div className={styles.detailContainer}>
            <div className={styles.detailContainerArticles}>
                <div className={styles.detailLeft}> {/*Agregar una estiqueta de producto no disponible condicionada al stock*/}
                    <h1 className={styles.detailTitle}>{productDetails.name}</h1>
                    <span className={styles.detailScore}>{stars}</span>
                </div> 
                <div className={styles.detailImagen}>
                    <img src={productDetails.image} alt="productos" />
                </div>
                <div className={styles.detailButton}>
                <Button onClick={()=> dispatch(addToCart({id: productDetails.id, name: productDetails.name, image: productDetails.image, price: productDetails.price, quantity: 1})) } variant="contained">Agregar al Carrito</Button>
                </div>
                <div className={styles.detailContainerOpinion }>
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
                          {/*displayForm && <ScoreForm id={id} formDisplay={formDisplay} />*/}
                    </div>
                      {/*isAuthenticated && <Button variant="contained" onClick={() =>formDisplay()}>Dar tu Opinion</Button>*/}
               </div>  
            </div>






        </div>
    )
}
