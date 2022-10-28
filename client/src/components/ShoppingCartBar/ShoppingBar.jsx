import { useSlotProps } from "@mui/base";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { addOneToCart } from "../../redux/actions/add_one_to_cart";
import { removeOneFromCart } from "../../redux/actions/remove_one_from_cart";
import { removeProductFromCart } from "../../redux/actions/remove_product_from_cart";
import './ShoppingBar.css'

export default function ShoppingBar(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector((state) => state.cart);
    const [currentPage, setPage] = React.useState(1);
    const itemsPerPage = 8;
    let sliceCart = itemsPerPage*currentPage;
    let firstItem = sliceCart-itemsPerPage;
    let currentCart = cart.slice(firstItem,sliceCart);
    
    function handleErase(id){
        dispatch(removeProductFromCart(id))
    }
    function handleMore(id){
        dispatch(addOneToCart(id))
    } 
    function handleLess(id){
        dispatch(removeOneFromCart(id))
    }
    function goToBig(){
        props.handleDisplayCart();
        history.push('/shoppingCart')
    }  
    return(
        <div className="cartcontainer">
            {cart && cart.length > 0 ? 
                <div className="totalcontainer">
                    <p className="qtty">Cant: {cart.reduce(function ( acc, va){return (acc + va.quantity)},0)}</p>
                    <p className="qtty">Tot: {cart.reduce(function ( acc, va){return (acc + (va.quantity*va.price))},0)} </p>
                    <button className="check" onClick={()=> goToBig()}>Pagar</button>
                </div>: null}
            {cart && cart.length - itemsPerPage > 0 ? 
                <div className="totalcontainer">
                <p className="qtty">{currentPage}</p>
                    <div>
                        <button disabled={currentPage === 1} className="check" onClick={()=>setPage(currentPage-1)}>&#5130;</button>
                        <button disabled={currentPage === Math.ceil(cart.length/itemsPerPage)} className="check" onClick={()=>setPage(currentPage+1)}>&#5125;</button>
                    </div>
                </div>: <div>  </div>}
            {currentCart && currentCart.length > 0 ? currentCart.map(a => {
                return(
            <div className="itemcontainer"> 
                <img src={a.image[0]} width={"30px"} height={"35px"} className="img"/>
                <button className="btn" onClick={() => handleLess(a.id)}>-</button>
                <p className="numbox">{a.quantity}</p>
                <button className="btn" onClick={() => handleMore(a.id)}>+</button>
                <button value={a.id} className="erase" onClick={() => handleErase(a.id)}>x</button>
            </div>)}): <p>No hay nada aún</p>}
        </div>
    )
}
