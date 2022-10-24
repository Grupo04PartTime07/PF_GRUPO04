import React from 'react';
import styles from "./wishedProduct.module.css";
import {Link} from "react-router-dom";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';


export default function WishedProduct(props) {

    return (
        <div className={styles.divCartItem}>
            <div className={styles.img_container}>
                <img className={styles.img}  src={props.image} alt="productImg"/>
            </div>
            <div className={styles.divName}>
                <Link to={`/products/${props.id}`} style={{textDecoration:"none", color: 'rgb(82, 82, 82)'}} >
                    <span className={styles.name}>{props.name}</span>
                </Link>
            </div>
            <div className={styles.divPrice}>
                <span className={styles.price}>${props.price}</span>
            </div>
            <div className={styles.divQuantity}>
                <button className={styles.bttnAdd} onClick={()=> props.addToCartFromWL({id: props.id, name: props.name, image: props.image, price: props.price, quantity: 1})}><ShoppingCartTwoToneIcon/></button>
            </div>
            <button className={styles.bttnDelete} onClick={()=> props.removeProductFromWishList(props.id)}>x</button>
        </div>

    )
}