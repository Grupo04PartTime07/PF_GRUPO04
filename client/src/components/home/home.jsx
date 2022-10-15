import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/get_products';


export default function Home(){

const dispatch = useDispatch();

useEffect(() => {  // Didmount and DidUpdate controlled
    dispatch(getAllProducts());
    },[dispatch]) 

const products = useSelector( state => state.productsaux)

    
    
    return(
        <div>
            {products && products.map(a => a.stock === 0 ? null : <Card name={a.name} image={a.image} price={a.price}/>)}
        </div>
    )
}