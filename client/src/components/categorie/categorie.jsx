import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory } from '../../redux/actions/filter_by_category';
import Loading from "../loading/loading";
import './categorie.css'

export default function Categorie(props){
    
    const dispatch = useDispatch();
    const productsaux = useSelector( state => state.productsaux)

    useEffect(() => {  // Didmount and DidUpdate controlled
        
        dispatch(filterByCategory(props.history.location.state));
    },[dispatch]) 

    return(
        productsaux[0] && productsaux[0].price ? <div>
            <h2 className="categorieTitle">{props.history.location.state}</h2>
            <div className="homeTable">
                { productsaux.map(a => a.stock === 0 ? null : <Card name={a.name} image={a.image} price={a.price}/>) }
            </div>
        </div> : <Loading/>
    )
}