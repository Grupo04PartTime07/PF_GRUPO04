import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/get_products';

export default function Home(){

    const dispatch = useDispatch();
    const products = useSelector( state => state.productsaux)
    
    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getAllProducts());
    },[dispatch]) 

    return(
        <div>
            {products.map(a => a.stock === 0 ? null : <Card name={a.name} image={a.image} price={a.price}/>)}
        </div>
    )
}