import React,{useEffect} from "react";
import Card from '../../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/get_products';
import Loading from "../../loading/loading";
import '../home.css'
import NoStockCard from "../../card/noStockCard";
import { cleanOtherProducts } from '../../../redux/actions/clean_other_products'

export default function BestRatedProducts(){

    const dispatch = useDispatch();
    const bestRatedProducts = useSelector( state => state.products)

    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getAllProducts());    
        return(() => {
          dispatch(cleanOtherProducts())
      })
    },[dispatch])

    bestRatedProducts.sort(function (a, b) {
        if (a.score > b.score) return -1
        else if (b.score > a.score) return 1
        else return 0
    })

    function bestProducts(){
        return bestRatedProducts.filter(p => p.stock > 0).slice(0,10)
    }

    return(
        bestProducts()[0] && bestProducts()[0].price ? <div>
            <div>
              <h2 className="homeTitle">Top 10 más valorados</h2>
              <div className="homeTable"> {/*#AgregameUnaEstrella*/}
                  { bestProducts().map(a => a.stock < 1 ? null : <Card key={a.id} id={a.id} name={a.name} image={a.image} price={a.price} score={a.score}/>) }
              </div>
            </div>
        </div> : null
    )
}