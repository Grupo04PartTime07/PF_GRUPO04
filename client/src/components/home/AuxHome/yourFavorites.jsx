import React,{useEffect} from "react";
import Card from '../../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../../../redux/actions/get_favorites';
import '../home.css'

export default function YourFavorites(){

    const dispatch = useDispatch();
    const favoritesHome = useSelector(state => state.favorites)

    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getFavorites());
    },[dispatch])

    function favoritesHomeFunction(){
        return favoritesHome.slice(0,4)
    }

    return(
        favoritesHome[3] && favoritesHome[3].price ? <div>
            <div>
              <h2 className="homeTitle">Algunos de tus favoritos</h2>
              <div className="homeTable"> {/*#AgregameUnaEstrella*/}
                  { favoritesHomeFunction().map(a => a.stock < 0 ? null : <Card key={a.id} id={a.id} name={a.name} image={a.image} price={a.price} score={a.score}/>) }
              </div>
            </div>
        </div> : null
    )
}