import React from 'react';
import styles from "./cartItem.module.css";
import {Link} from "react-router-dom"


export default function CartItem(props) {

    return (
        <div className={styles.divCartItem}>
            <img className={styles.img}  src={props.image} alt="productImg"/>
            <div className={styles.divName}>
            <Link to={`/products/${props.id}`} style={{textDecoration:"none"}} >
            <span className={styles.name}>{props.name}</span>
            </Link>
            </div>
            <div className={styles.divPrice}>
            <span className={styles.price}>${props.price}</span>
            </div>
            <div className={styles.divQuantity}>
            <button className={styles.bttnRemove} onClick={()=> props.removeOneFromCart(props.id)}>-</button>
            <span className={styles.quantity}>{props.quantity}</span>
            <button className={styles.bttnAdd} onClick={()=> props.addOneToCart(props.id)}>+</button>
            </div>

            <div className={styles.divTotalPrice}>
            <span className={styles.totalPrice}>{props.price * props.quantity}</span>
            </div>
            <button className={styles.bttnDelete} onClick={()=> props.removeProductFromCart(props.id)}>X</button>
        </div>

    )
}