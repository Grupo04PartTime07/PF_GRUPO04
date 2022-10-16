import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/get_products';
import Loading from "../loading/loading";

export default function Home(){

    const dispatch = useDispatch();
    const products = useSelector( state => state.productsaux)
    
    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getAllProducts());
    },[dispatch]) 
    console.log(products)
    return(
        <div>
            {products[0] && products[0].price ? products.map(a => a.stock === 0 ? null : <Card name={a.name} image={a.image} price={a.price}/>) : <Loading/>}
        </div>
    )
}