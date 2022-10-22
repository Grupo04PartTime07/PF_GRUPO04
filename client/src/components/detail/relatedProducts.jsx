import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from "../../redux/actions/get_products";

export default function RelatedProducts(props){
    console.log(props.categorie)
    const dispatch = useDispatch();
    const products = useSelector( state => state.products)

    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getAllProducts());
    },[dispatch]) 

    const relatedProducts = products.filter(e => e.categories.includes(props.categorie)).filter(e => e.id !== props.id).slice(0,4)

    return(
        relatedProducts.length > 0 && <div className="categorieTable">
            <div className="productsByCategorie">
                <h2 className="relatedTitle">Tambien te puede interesar</h2>
                <div className="homeTable">
                    { relatedProducts.map(a => a.stock === 0 ? null : <Card id={a.id} name={a.name} image={a.image} price={a.price} score={a.score}/>) }
                </div>
            </div>
        </div>
    )
}