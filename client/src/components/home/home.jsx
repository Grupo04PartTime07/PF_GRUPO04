import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/get_products';
import Loading from "../loading/loading";
import './home.css'
import Banner from "./banner";

export default function Home(){

    const dispatch = useDispatch();
    const products = useSelector( state => state.products)
    
    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getAllProducts());
    },[dispatch]) 
    
    return(
        products[0] && products[0].price ? <div>
            <div><Banner/></div>
            <div className="homeTable">
                { products.map(a => a.stock === 0 ? null : <Card id={a.id} name={a.name} image={a.image} price={a.price}/>) }
            </div>
        </div> : <Loading/>
    )
}