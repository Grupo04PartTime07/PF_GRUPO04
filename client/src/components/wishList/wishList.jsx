import React,{useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import WishedProduct from "./wishedProduct.jsx"
import { addToCartFromWL } from '../../redux/actions/add_to_cart_from_wl';
import { removeProductFromWishList } from '../../redux/actions/remove_product_from_wish_list';
import { deleteWishList } from '../../redux/actions/delete_wish_list';
import styles from "./wishList.module.css";
import { getFavorites } from '../../redux/actions/get_favorites';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useHistory } from "react-router-dom";
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';

export default function WishList(props){

const history = useHistory()
const dispatch = useDispatch()
const favorites = useSelector(state => state.favorites)


useEffect(() => {  // Didmount and DidUpdate controlled
    window.scrollTo(0, 0)
    dispatch(getFavorites());
},[dispatch])



return(
        <div>
            
            <div className={styles.volver} onClick={() => history.goBack()}><IconButton sx={{ padding: 0 }} ><ArrowLeftRoundedIcon sx={{ color: grey[50]}}/></IconButton> Volver</div>
            
        <div className={styles.divShoppingCart}>
            <h1 className={styles.title}>Mis productos favoritos</h1>
            <hr></hr>
            <hr></hr>
            <div className={styles.divHeader}>
                <span className={styles.spanProducto} >Producto</span>
                <span className={styles.spanPrecio}>Precio</span>
                <button className={styles.bttnDelete} onClick={()=> dispatch(deleteWishList())}><DeleteForeverOutlinedIcon/></button>
            </div>
            <hr className={styles.hr}></hr>
            <hr></hr>
            {favorites.length >= 1?favorites.map(item => 
                <WishedProduct 
                key={item.id}
                id={item.id}
                image={item.image[0]}
                name={item.name.slice(0,20)+"..."}
                price={item.price}
                addToCartFromWL={()=> dispatch(addToCartFromWL({id: item.id, name: item.name, image: item.image, price: item.price, quantity: 1}))}
                removeProductFromWishList={()=> dispatch(removeProductFromWishList(item.id))}
                />): 
                <h2 className={styles.notFoundMessage}>No hay nada aún...</h2> 
            }
            <hr></hr>
            
        </div>
        </div>
    )
}