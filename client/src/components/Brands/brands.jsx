import React,{useEffect} from "react";
import Card from './cardBrand'
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../redux/actions/get_brands';
import Loading from "../loading/loading";
import './brands.css'


export default function Marcas(){

    const dispatch = useDispatch();
    const products = useSelector( state => state.brand)
    
    useEffect(() => {  // Didmount and DidUpdate controlled
        window.scrollTo(0, 0)
        dispatch(getBrands());
    },[dispatch]) 

    return(
        products[0] && products[0].name ? <div>
            <h2 className="brandTitle">Todas las marcas</h2>
            <div className="brandTable">
                { products.map(a => a.name === 0 ? null : <Card id={a.id} name={a.name} image={a.image}/>) }
            </div>
        </div> : <Loading/>
    )
}