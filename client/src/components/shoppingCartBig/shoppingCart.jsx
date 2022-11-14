import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem.jsx"
import { addOneToCart } from '../../redux/actions/add_one_to_cart';
import { removeOneFromCart } from '../../redux/actions/remove_one_from_cart';
import { removeProductFromCart } from '../../redux/actions/remove_product_from_cart';
import { deleteCart } from '../../redux/actions/delete_cart';
import {createScoreUser} from '../../redux/actions/create_score_user';
import { checkOutCart } from '../../redux/actions/check_out_cart';
import styles from "./shoppingCart.module.css";
import { getCart } from '../../redux/actions/get_cart';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useHistory } from "react-router-dom";
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import IconButton from '@mui/material/IconButton';
import ModalShippingAddress from "../modalShippingAddress/modalShippingAddress.jsx"
import {useAuth0} from '@auth0/auth0-react';
import { getUserDetails } from '../../redux/actions/get_user_details.js';
import { grey } from '@mui/material/colors';
import {scoreUserId} from '../../redux/reducer'


export default function ShoppingCartBig(props) {

    const history = useHistory()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart)
    const registeredUser = useSelector(state => state.userDetail)
    const { user, loginWithPopup } = useAuth0();
    let currentUser = "Guest"
    if(user && user.email) currentUser = user.email

    useEffect(() => {  // Didmount and DidUpdate controlled
        window.scrollTo(0, 0)
        dispatch(getCart());
    }, [dispatch])

    useEffect(()=>{
        dispatch(getUserDetails(user && user.email))
    }, [user])
    const [point, setPoint] = useState("0")
    const [shipping, setShipping] = useState("")
    const [modal, setModal] = useState(false)
    const [address, setAddress] = useState(registeredUser && registeredUser.address ? registeredUser.address : "")

    function handleDisabled() {
        return (
            !shipping ||
            cartItems.length === 0);
    }


    function handlePoint(){
        let user = registeredUser.email
        let pointSum = 0
        
        if (point > 0){
            pointSum = (-point)
        }else{
        
        pointSum = Math.ceil((cartItems.reduce(function (acc, va) {
            return (acc + (va.quantity * va.price))}
        , 0) * .1)
        );
        }
        let userPoint = {
            option: 'puntos',
            value: pointSum,
            userRegistedId: user
        }
        
        dispatch(createScoreUser(userPoint))
        console.log(userPoint)
        // console.log(user)
        // setPoint(point)
        }

    function updateStorage(user, cart){
        let updatedCart = JSON.stringify(cart);
        window.localStorage.setItem(user, updatedCart)
    }

    function handlecheckout() {
        let objTotal = {}

        if(point > 0){
            let total = cartItems.map(e => {
                return { id: e.id, title: e.name, unit_price: e.price, quantity: e.quantity }
            }).concat([
                {
                    id: 999, title: "Descuento",
                    unit_price: - (point / 5) , quantity: 1
                },
                {
                id: 0, title: "Costo de Envio",
                unit_price: Number(shipping), quantity: 1
            }])
    
            objTotal = { subtotal: cartItems.reduce(function (acc, va) { 
                return (acc + (va.quantity * va.price)) }, 0) + 
                Number(shipping)-(point / 5) , cart: total, email: user.email, direccion: address }
        }

        

        else{
        let total = cartItems.map(e => {
            return { id: e.id, title: e.name, unit_price: e.price, quantity: e.quantity }
        }).concat({
            id: 0, title: "Costo de Envio",
            unit_price: Number(shipping), quantity: 1
        })

        objTotal = { subtotal: cartItems.reduce(function (acc, va) { 
            return (acc + (va.quantity * va.price)) }, 0) + 
            Number(shipping), cart: total, email: user.email, direccion: address }}
       
        dispatch(checkOutCart(objTotal))
        dispatch(deleteCart())
        dispatch(handlePoint());
        updateStorage(`c${currentUser}`, [])
        
        

        closeModal()
    }

    const openModal = (e) => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }

    const score = useSelector(state =>state.scoreUserId)


    return (
        <div className={styles.container}>
            <div className={styles.volver} onClick={() => history.goBack()}><IconButton sx={{ padding: 0 }} ><ArrowLeftRoundedIcon sx={{ color: grey[50]}}/></IconButton> Volver</div>
            <div className={styles.divShoppingCart}>
                <h1 className={styles.title}>Carrito de compras</h1>
                <hr></hr>
                <hr></hr>
                <div className={styles.divHeader}>
                    <span className={styles.spanProducto} >Producto</span>
                    <span className={styles.spanPrecio}>Precio</span>
                    <span className={styles.spanCantidad}>Cantidad</span>
                    <span className={styles.span}>Total</span>
                    <button className={styles.bttnDelete} onClick={() => dispatch(deleteCart())}><DeleteForeverOutlinedIcon /></button>
                </div>
                <hr className={styles.hr}></hr>
                <hr></hr>
                {cartItems.length >= 1 ? cartItems.map(item =>
                    <CartItem
                        key={item.id}
                        id={item.id}
                        image={item.image[0]}
                        stock= {item.stock} 
                        name={item.name.slice(0, 20) + "..."}
                        price={item.price}
                        addOneToCart={() => dispatch(addOneToCart(item.id))}
                        quantity={item.quantity}
                        removeOneFromCart={() => dispatch(removeOneFromCart(item.id))}
                        removeProductFromCart={() => dispatch(removeProductFromCart(item.id))}

                    />) :
                    <h2 className={styles.notFoundMessage}>No hay nada aún...</h2>
                }
                <div className={styles.purchaseContainer}>
                    <div className={styles.divShipping}>
                        <label className={styles.shipping} htmlFor="shipping-costs">Costo de envio: </label>
                        <select className={styles.shippingPrice} name="shipping-costs" id="shipping-costs" defaultValue=""
                            onChange={(e) => setShipping(e.target.value)}
                        >
                            <option disabled value="" >Elije una opcion de entrega:</option>
                            <option value="0">$0 (Retiro en Tienda: 10hs a 20hs - Av. Cordoba 1940, CABA)</option>
                            <option value="299" >$299 (Envio a domicilio: 8hs a 21hs - CABA)</option>
                            <option value="349">$349 (Envio a domicilio: 12hs a 16hs - CABA)</option>
                            <option value="399">$399 (Envio a domicilio: 18hs a 21hs - CABA)</option>
                        </select>
                    </div>
                    <div className={styles.divTotalScore}>
                        {point > 0 && user.isAdmin === false? <div className={styles.divTotalScoreinside}>
                        <p className={styles.total}>Tienes un descuento de: </p>
                        <p className={styles.cartPoint} > 
                            ${point / 5 }</p></div>: 
                            <div className={styles.flexpoint}>
                            <p className={styles.total}>Con tu compra sumas: </p>
                        <p className={styles.cartPoint} onChange={(e) => setPoint(e.target.value)}> 
                            {Math.ceil((cartItems.reduce(function (acc, va) {
                                return (acc + (va.quantity * va.price))
                            }, 0) * .1)
                            )} 
                            Puntos.</p></div>}
                            {score < 500? null :<select className={styles.pointPrice} name="shipping-costs" id="shipping-costs" defaultValue=""
                            onChange={(e) => setPoint(e.target.value)}
                        >
                            <option value="0" >Canjea tus puntos</option>
                            {score > 500?<option value="500">500 Pts.</option>: null}
                            {score > 1000?<option value="1000">1000 Pts.</option>: null}
                            {score > 1500?<option value="1500">1500 Pts.</option>: null}
                            {score > 2000?<option value="2000">2000 Pts.</option>: null}
                        </select>}
                    </div>
                    <div className={styles.divCantProductos}>
                        <p className={styles.pCantProductos}>Cantidad de productos: </p>
                        <span className={styles.spanCantProductos}>{cartItems.reduce(function (acc, va) { return (acc + va.quantity) }, 0)} u.</span>
                    </div>
                    <div className={styles.divTotal}>
                        <p className={styles.total}>Precio final: </p>
                        <span className={styles.cartPrice}>$ {cartItems.reduce(function (acc, va) { return (acc + (va.quantity * va.price)) }, 0) + Number(shipping) - (point / 5)}</span>
                    </div>
                    <div className={styles.divBttnPagar} >
                        {user && user.email ? <button className={styles.bttnPagar} disabled={handleDisabled()} onClick={shipping === "0" ? () => handlecheckout() : () => openModal()}>Finalizar compra</button>: <button className={styles.bttnPagar} onClick={loginWithPopup}>Inicia Sesión para Continuar</button>}
                    </div>
                    <ModalShippingAddress
                        modal={modal}
                        openModal={openModal}
                        closeModal={closeModal}
                        handlecheckout={handlecheckout}
                        address={address}
                        setAddress={setAddress}
                        user={user && user.given_name+" "+user.family_name}

                    >
                    </ModalShippingAddress>
                </div>
            </div>
        </div>
    )
    
}