import React,{useEffect, useState} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { filterByBrand } from "../../redux/actions/filter_by_brand";
import { cleanProducts } from "../../redux/actions/clean_products";
import { orderByPrice } from '../../redux/actions/order_price';
import { orderByRate } from "../../redux/actions/order_rate";
import Loading from "../loading/loading";
import './brand_products.css'
import { grey } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import IconButton from '@mui/material/IconButton';

export default function Brand(props){
    const history = useHistory()
    const dispatch = useDispatch();
    const productsaux = useSelector( state => state.productsaux)
    const [ order, setOrder ] = useState('')

    useEffect(() => {  // Didmount and DidUpdate controlled
        window.scrollTo(0, 0)
        dispatch(filterByBrand(props.history.location.state));
        return(() => {
            dispatch(cleanProducts({}))
        })
    },[dispatch, props.history.location.state]) 

    function handlePrice(e){
        dispatch(orderByPrice(e.target.value))
        setOrder(e.target.value)
    }

    function handleRate(e){
        dispatch(orderByRate(e.target.value))
        setOrder(e.target.value)
    }

    return(
        productsaux[0] && productsaux[0].price ? <div className="categorieTable">
            <div className="categorieFilters">
                <div className='volverBrand' onClick={() => history.goBack()}><IconButton sx={{ padding: 0 }} ><ArrowLeftRoundedIcon sx={{ color: grey[50]}}/></IconButton> <span className="buttonVolver">Volver</span></div>
                <div className="filterTitle">
                    Filtrar por:
                
                    <div className="categorieOptions">
                    <div className="filterContainerCategorie">
                        <div className="priceFilter">
                            Precio
                        </div>
                        <div className="buttonsTable">
                            <button id='asc' className="filterButtons" value='asc' onClick={(e) => handlePrice(e)}>Menor a mayor precio</button>
                            <button id='desc' className="filterButtons" value='desc' onClick={(e) => handlePrice(e)}>Mayor a menor precio</button>
                        </div></div>
                        <div className="filterContainerCategorie">
                        <div className="ratingFilter">
                        
                            Valoración
                        </div>
                        <div className="buttonsTable">
                            <button className="ratingButtons" value='good' onClick={(e) => handleRate(e)}>Más valorado</button>
                            <button className="ratingButtons" value='bad' onClick={(e) => handleRate(e)}>Menos valorado</button>
                        </div></div>
                    </div>
                </div>
            </div>
            <div className="productsByCategorie">
                <h2 className="categorieTitle">{props.history.location.state}</h2>
                <div className="categorieProductsTable">
                    { productsaux.map(a => a.stock === 0 ? null : <Card id={a.id} name={a.name} image={a.image} price={a.price} score={a.score}/>) }
                </div>
            </div>
        </div> : <Loading/>
    )
}