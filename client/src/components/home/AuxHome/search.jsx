import React,{useEffect} from "react";
import Card from '../../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from "../../loading/loading";
import '../home.css'
import { cleanOtherProducts } from '../../../redux/actions/clean_other_products'
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';

export default function Search(){

    const dispatch = useDispatch();
    const products = useSelector( state => state.products)
    const history = useHistory()

    useEffect(() => {  // Didmount and DidUpdate controlled
        window.scrollTo(0, 0)
        return(() => {
          dispatch(cleanOtherProducts())
      })
    },[dispatch])

    return(
        <div>
            <div className="volver" onClick={() => history.goBack()}><IconButton sx={{ padding: 0 }} ><ArrowLeftRoundedIcon sx={{ color: grey[50]}}/></IconButton> Volver</div>
            { products[0] && products[0].price ? <div>
                <h2 className="homeTitle">Resultados de la Busqueda</h2>
                <div className="homeTable">
                    { products.map(a => a.stock === 0 ? null : <Card key={a.id} id={a.id} name={a.name} stock={a.stock} image={a.image} price={a.price} score={a.score}/>) }
                </div>

            </div> : <Loading/>}
        </div>
    )
}