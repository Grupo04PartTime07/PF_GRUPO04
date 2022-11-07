import React from "react";
import CreateAccount from "../account/account";
import AdminProducts from "../adminProduct/adminProducts";
import AdminUsers from "../adminUsers/users";
import OrderList from "../userOrders/orderList";
import './profile.css'
import Avatar from '@mui/material/Avatar';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import {useEffect} from 'react';
import AdminOrders from "../adminOrders/adminOrders";
import { useState } from "react";
import Loading from "../loading/loading";

import { getUserDetails } from "../../redux/actions/get_user_details";
import { useDispatch, useSelector } from "react-redux";

export default function Profile(){
    const dispatch = useDispatch();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    let profile = window.localStorage.getItem('isAdmin')
    
    const userdetail = useSelector((state) => state.userDetail)
    user.isAdmin = userdetail.isAdmin;

    async function callProtectedApiToken2(){
        try{
          const token = await getAccessTokenSilently();
          const response = await axios.post('http://localhost:3001/users' , {
                name: user.name || " " , 
                email: user.email
            },{headers:{
            authorization:`Bearer ${token}`,
          }});
          user.isAdmin = response.data.userRegisted.isAdmin;
          user.isBanned = response.data.userRegisted.isAdmin;
          window.localStorage.setItem('isAdmin', user.isAdmin)
        }catch(error) {
          console.log(error);
        }
    }

     useEffect(() => {
        if (isAuthenticated){
            return () => {
                const usuario = callProtectedApiToken2();
            }
        }
    }, [isAuthenticated])

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getUserDetails(user.email));
    },[dispatch])
    
    const [ checked, setChecked ] = React.useState('datos')

    function handleCheck(e){
        setChecked(e.target.value);
    };
    console.log("userdetail" + userdetail.email);
    return typeof user.isAdmin === "boolean" ?(
        
        <div className="profile">
            {/* {console.log("esta autenticado? "+isAuthenticated)}*/}
            {/* {console.log("user es? ")}
           { console.log(user)} */}
            
            <div className="profileMenu">
                <div className="profileImg">
                    {isAuthenticated && <Avatar sx={{ width: 100, height: 100 }} alt={user.name} src={user.picture} />}
                </div>
                {(user.isAdmin )? <h3 className="menuTitle">Bienvenido Administrador</h3> : <h3 className="menuTitle">Bienvenido {isAuthenticated && user.given_name}</h3>}
                <div className="list">
                    <label>
                        <input className="radioButton" value='datos' type="radio" checked={checked === 'datos'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Mis datos</p>
                    </label>
                    {user && user.isAdmin === false ? <label>
                        <input className="radioButton" value='compras' type="radio" checked={checked === 'compras'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Mis Compras</p>
                    </label> : null}
                    { user.isAdmin && <label>
                        <input className="radioButton" value='adminProducts' type="radio" checked={checked === 'adminProducts'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Gestión de Productos</p>
                    </label>}
                    {user.isAdmin &&  <label>
                        <input className="radioButton" value='adminOrders' type="radio" checked={checked === 'adminOrders'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Gestión de Ventas</p>
                    </label>}
                    { user.isAdmin  && <label>
                        <input className="radioButton" value='adminUsers' type="radio" checked={checked === 'adminUsers'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Gestión de Usuarios</p>
                    </label>}
                </div>
            </div>
            <div className="component">
                {checked === 'datos' ? <CreateAccount/> : checked === 'compras' ? <OrderList/> : checked === 'adminProducts' ? <AdminProducts/> : checked === 'adminOrders' ? <AdminOrders/> : checked === 'adminUsers' ? <AdminUsers/> : <CreateAccount/>}
            </div>
        </div>
    ):    (
        <Loading />
      );
}