import React,{useEffect, useState} from "react";
import Card from '../card/card'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory } from '../../redux/actions/filter_by_category';
import { orderByPrice } from '../../redux/actions/order_price';
import { orderByRate } from "../../redux/actions/order_rate";
import { cleanProducts } from "../../redux/actions/clean_products";
import Loading from "../loading/loading";
import './categorie.css'

export default function Categorie(props){
    
    const dispatch = useDispatch();
    const productsaux = useSelector( state => state.productsaux)
    const [ order, setOrder ] = useState('')

    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(filterByCategory(props.history.location.state)); 
        return(() => {
            dispatch(cleanProducts({}))
        })
    },[dispatch])

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
                <Link className="linkToBack" to='/Categorias'>
                    <h3 className="linkToBack">
                        Volver
                    </h3>
                </Link>
                <div>
                    Filtrar por:
                
                    <div>
                        <div className="priceFilter">
                            Precio
                        </div>
                        <div className="buttonsTable">
                            <button id='asc' className="filterButtons" value='asc' onClick={(e) => handlePrice(e)}>Menor a mayor precio</button>
                            <button id='desc' className="filterButtons" value='desc' onClick={(e) => handlePrice(e)}>Mayor a menor precio</button>
                        </div>
                        <div className="ratingFilter">
                            Valoración
                        </div>
                        <div className="buttonsTable">
                            <button className="ratingButtons" value='good' onClick={(e) => handleRate(e)}>Más valorado</button>
                            <button className="ratingButtons" value='bad' onClick={(e) => handleRate(e)}>Menos valorado</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productsByCategorie">
                <h2 className="categorieTitle">{props.history.location.state}</h2>
                <div className="homeTable">
                    { productsaux.map(a => a.stock === 0 ? null : <Card id={a.id} name={a.name} image={a.image} price={a.price}/>) }
                </div>
            </div>
        </div> : <Loading/>
    )
}