import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";


import './ShoppingBar.css'

export default function ShoppingBar(){
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    
    return(
        <div className="cartcontainer">
            {cart && cart.length > 0 ? 
                <div className="totalcontainer">
                <p className="qtty">Cant: {cart.reduce(function ( acc, va){return (acc + va.quantity)},0)}</p>
                <p className="qtty">Tot: {cart.reduce(function ( acc, va){return (acc + (va.quantity*va.price))},0)} </p>
                <Link to='/shoppingCart'>
                <button className="check">Checkout</button>
                </Link>
                </div>: null}
            {cart && cart.length > 0 ? cart.map(a => {
                return(
            <div className="itemcontainer"> 
                <img src={a.image} width={"30px"} className="img"/>
                <button className="btn">-</button>
                <p className="numbox">{a.quantity}</p>
                <button className="btn">+</button>
                <button className="erase">X</button>
            </div>)}): <p>El Carrito esta Vacio</p>}
        </div>
    )
}