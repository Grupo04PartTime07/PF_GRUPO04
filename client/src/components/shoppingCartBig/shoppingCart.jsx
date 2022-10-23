import React,{useEffect, useState} from 'react';
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

const [shipping, setShipping] = useState("")

function handleDisabled(){
    return (
        !shipping || 
      cartItems.length === 0);
}





    return(
        <div className={styles.divShoppingCart}>
            <h1 className={styles.title}>Carrito de compras</h1>
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
            {cartItems.length >= 1?cartItems.map(item => 
                <CartItem 
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name.slice(0,20)+"..."}
                price={item.price}
                addOneToCart={()=> dispatch(addOneToCart(item.id))}
                quantity={item.quantity}
                removeOneFromCart={()=> dispatch(removeOneFromCart(item.id))}
                removeProductFromCart={()=> dispatch(removeProductFromCart(item.id))}

                />): 
                <h2 className={styles.notFoundMessage}>No hay nada aún...</h2> 
            }
            <div className={styles.purchaseContainer}>
                <div className={styles.divShipping}>
                    <label className={styles.shipping} htmlFor="shipping-costs">Costo de envio: </label>
                    <select className={styles.shippingPrice} name="shipping-costs"id="shipping-costs" defaultValue=""
                    onChange={(e) => setShipping(e.target.value) }
                    >
                    <option disabled value="" >Elije una opcion de entrega:</option>
                    <option value="0">$0 (Retiro en Tienda: 10hs a 20hs - Av. Cordoba 1940, CABA)</option>
                    <option value="299">$299 (Envio a domicilio: 8hs a 21hs - CABA)</option>
                    <option value="349">$349 (Envio a domicilio: 12hs a 16hs - CABA)</option>
                    <option value="399">$399 (Envio a domicilio: 18hs a 21hs - CABA)</option>
                    </select>
                </div>
                <div className={styles.divCantProductos}>
                    <p className={styles.pCantProductos}>Cantidad de productos: </p>  
                    <span className={styles.spanCantProductos}>{cartItems.reduce(function ( acc, va){return (acc + va.quantity)},0)}</span> 
                </div>
                <div className={styles.divTotal}>
                    <p className={styles.total}>Precio final: </p>
                    <span className={styles.cartPrice}>${cartItems.reduce(function ( acc, va){return (acc + (va.quantity*va.price))},0)+Number(shipping)}</span> 
                </div>
                <div className={styles.divBttnPagar} >
                    <button className={styles.bttnPagar} disabled={handleDisabled()} onClick={()=> dispatch(checkOutCart(cartItems.map(e => {return {id:e.id,title:e.name, unit_price:e.price, quantity:e.quantity}}).concat({id: 0, title:"Costo de Envio", unit_price:Number(shipping), quantity: 1})  ))}>Finalizar compra</button>
                </div>
            </div>
        </div>
    )
}