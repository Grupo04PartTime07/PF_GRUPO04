import React from "react";
import './detail.css';
import { Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProductDetails} from '../../redux/actions/get_product_details';
import {cleanProductState} from '../../redux/actions/clean_product_state';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import RelatedProducts from "./relatedProducts";
import Loading from "../loading/loading";

function Detail(props) {
    const {id} = props.match.params;
    const dispatch = useDispatch();
    
    useEffect(()=> {
        window.scrollTo(0, 0)
        dispatch(getProductDetails(id));
        return(() => {
            dispatch(cleanProductState({}))
        })
    }, [dispatch, id])

    const detail = useSelector((state) => state.productdetail)
    let stars = [];
    for (let i = 0; i < Math.ceil(detail.score); i++) {
        stars.push(<StarRoundedIcon />)
    }

    return (
            typeof detail.id === 'number' ? <div className="detailContainer"> 
                <div className="detailContainerArticles">
                        <div className="detailLeft">
                            <h1 className="detailTitle">{detail.name}</h1>
                            <span className="detailScore">{stars}</span>
                            <h2 className="detailPrice"> $ {detail.price}</h2>
                            <p className="detailDescription">{detail.description}</p>
                        <div className="detailButton">
                            <span className="buttonMargin"><Button variant="contained" >Comprar</Button></span>
                            <Button variant="contained">Agregar al Carrito</Button>
                        </div>
                    </div>
                    <div className="detailImagen">
                        <img src={detail.image} alt="productos" />
                    </div>
                </div>
                <div className="detailContainerOpinion detailMargin">
                    <h1 className="opinionTitle">Opiniones</h1>
                    <div className="opinionContainer">
                        {detail.opiniones && detail.opiniones.map((e) => {
                            let starsOpinion = [];
                            for (let i = 0; i < Math.ceil(e.score); i++) {
                                starsOpinion.push(<StarRoundedIcon />)
                            }
                            return (
                                <div >
                                    <span>{starsOpinion}</span>
                                    <p className="detailDescription">{e.coment}</p>
                                </div>
                            )
                        })}
                    </div>  
                    <Button variant="contained">Dar tu Opinion</Button>
                </div>
                <div>
                    <RelatedProducts id={detail.id} categorie={detail.categories ? detail.categories[0] : null}/>
                </div>
            </div> : <Loading/>
    )
}

export default Detail;

