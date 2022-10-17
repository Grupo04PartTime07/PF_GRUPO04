import React from "react";
import './detail.css';
import { Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProductDetails} from '../../redux/actions/get_product_details'
import {cleanProductState} from '../../redux/actions/clean_product_state'

function Detail(props) {
  const {id} = props.match.params;
  const dispatch = useDispatch();
    
  useEffect(()=> {
       dispatch(getProductDetails(id));
       return(() => {
           dispatch(cleanProductState({}))
       })
   }, [dispatch, id])

   const detail = useSelector((state) => state.productdetail)

   const opiniones = [
    {
        name: "Maria Marta",
        description:"ahora puedo ponerme al sol sin sufrir las consecuencias",
        rating: 3,
    },{
        name: "emanuel ortega",
        description:"la pagina esta bien",
        rating: 5, 
    },{
        name: "sanfilipo",
        description:"el producto me llego dañado",
        rating: 1,
    }
      ,
  ];

  return (<div className="detailContainer"> 
            <div className="detailContainerArticles">
                    <div>
                        <h1 className="detailTitle">{detail.name}</h1>
                        <span>{detail.rating}</span>
                        <h2 className="detailPrice"> $ {detail.price}</h2>
                        <p className="detailDescription">{detail.description}</p>
                    <div className="detailButton">
                        <Button variant="contained">Comprar</Button>
                        <Button variant="contained">Agregar al Carrito</Button>
                    </div>
                </div>
                <div className="detailImagen"><img src={detail.image} alt="productos" /></div>
            </div>
            <div className="detailContainerOpinion detailMargin">
            <h1 className="opinionTitle">Opiniones</h1>
            <div className="opinionContainer">
            {opiniones && opiniones.map((e) => {
                return (
                <div >
                    <span>{e.rating}</span>
                    <p className="detailDescription">{e.description}</p>
                </div>)
            })}
            </div>  
            <Button variant="contained">Dar tu Opinion</Button>
        </div>
           
        </div>
)}

export default Detail;

