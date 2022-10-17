import React,{useEffect} from "react";
import Card from './cardBrand'
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../redux/actions/get_brands';
import Loading from "../loading/loading";


export default function Marcas(){

    const dispatch = useDispatch();
    const products = useSelector( state => state.brand)
    
    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getBrands());
    },[dispatch]) 
    console.log(products)
    return(
        products[0] && products[0].name ? <div>
            <div className="brandTable">
                { products.map(a => a.name === 0 ? null : <Card name={a.name} image={a.image}/>) }
            </div>
        </div> : <Loading/>
    )
}