import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { filterByBrand } from "../../redux/actions/filter_by_brand";
import Loading from "../loading/loading";
import './brand_products.css'

export default function Brand(props){
    
    const dispatch = useDispatch();
    const productsaux = useSelector( state => state.productsaux)

    useEffect(() => {  // Didmount and DidUpdate controlled
        window.scrollTo(0, 0)
        dispatch(filterByBrand(props.history.location.state));
    },[dispatch]) 

    return(
        productsaux[0] && productsaux[0].price ? <div>
            <h2 className="categorieTitle">{props.history.location.state}</h2>
            <div className="homeTable">
                { productsaux.map(a => a.stock === 0 ? null : <Card id={a.id} name={a.name} image={a.image} price={a.price} score={a.score}/>) }
            </div>
        </div> : <Loading/>
    )
}