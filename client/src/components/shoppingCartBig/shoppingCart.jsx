import React,{useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./cartItem.jsx"
import { addOneToCart } from '../../redux/actions/add_one_to_cart';
import { removeOneFromCart } from '../../redux/actions/remove_one_from_cart';
import { removeProductFromCart } from '../../redux/actions/remove_product_from_cart';
import { deleteCart } from '../../redux/actions/delete_cart';
import { checkOutCart } from '../../redux/actions/check_out_cart';
import styles from "./shoppingCart.module.css";
import { getCart } from '../../redux/actions/get_cart';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function ShoppingCartBig(props){

const dispatch = useDispatch()
const cartItems = useSelector(state => state.cart)

useEffect(() => {  // Didmount and DidUpdate controlled
    dispatch(getCart());
},[dispatch])

    return(
        <div className={styles.divShoppingCart}>
            <h1 className={styles.title}>CARRITO DE COMPRA</h1>
            <hr></hr>
            <hr></hr>
            <div className={styles.divHeader}>
            <span className={styles.spanProducto} >Producto</span>
            <span className={styles.spanPrecio}>Precio</span>
            <span className={styles.spanCantidad}>Cantidad</span>
            <span className={styles.span}>Total</span>
            <button className={styles.bttnDelete} onClick={()=> dispatch(deleteCart())}><DeleteForeverOutlinedIcon/></button>
            </div>
            <hr className={styles.hr}></hr>
            <hr></hr>
            {cartItems.length >= 1?cartItems.map(item => <CartItem 
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name.slice(0,20)+"..."}
            price={item.price}
            addOneToCart={()=> dispatch(addOneToCart(item.id))}
            quantity={item.quantity}
            removeOneFromCart={()=> dispatch(removeOneFromCart(item.id))}
            removeProductFromCart={()=> dispatch(removeProductFromCart(item.id))}

            />): <h2 className={styles.notFoundMessage}>EL CARRITO SE ENCUENTRA VACIO</h2> }
            <div className={styles.divShipping}>
            <p className={styles.shipping}>Gastos de envio:</p>  
            <span className={styles.shippingPrice}>$399 (zona de cobertura: CABA)</span> 
            </div>
            <div className={styles.divCantProductos}>
            <p className={styles.pCantProductos}>Cantidad de productos: </p>  
            <span className={styles.spanCantProductos}>{cartItems.reduce(function ( acc, va){return (acc + va.quantity)},0)}</span> 
            </div>
            <div className={styles.divTotal}>
            <p className={styles.total}>Total carrito: </p>
            <span className={styles.cartPrice}>${cartItems.reduce(function ( acc, va){return (acc + (va.quantity*va.price))},0)+399}</span> 
            </div>
            <div className={styles.divBttnPagar} >
            <button className={styles.bttnPagar} onClick={()=> dispatch(checkOutCart(cartItems.map(e => {return {title:e.name, unit_price:e.price, quantity:e.quantity}})))}>Pagar carrito</button>
            </div>

       </div>
    )}