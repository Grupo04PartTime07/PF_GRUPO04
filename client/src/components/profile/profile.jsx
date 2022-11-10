import React from "react";
import CreateAccount from "../account/account";
import AdminProducts from "../adminProduct/adminProducts";
import AdminUsers from "../adminUsers/users";
import OrderList from "../userOrders/orderList";
import './profile.css'
import Avatar from '@mui/material/Avatar';
import {useAuth0} from '@auth0/auth0-react';
import {useEffect} from 'react';
import AdminOrders from "../adminOrders/adminOrders";
import Loading from "../loading/loading";
import { getUserDetails } from "../../redux/actions/get_user_details";
import { useDispatch, useSelector } from "react-redux";

export default function Profile(){
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();

    
    const userdetail = useSelector((state) => state.userDetail)

    useEffect(() => {
        window.scrollTo(0, 0)
        if(isAuthenticated) dispatch(getUserDetails(user.email));
    },[isAuthenticated])
    
    const [ checked, setChecked ] = React.useState('datos')

    function handleCheck(e){
        setChecked(e.target.value);
    };
 
    return isAuthenticated ?(
        
        <div className="profile">           
            <div className="profileMenu">
                <div className="profileImg">
                    {isAuthenticated && <Avatar sx={{ width: 100, height: 100 }} alt={user.name} src={user.picture} />}
                </div>
                <h3 className="menuTitle">Bienvenido {userdetail.name}</h3>
                <div className="list">
                    <label>
                        <input className="radioButton" value='datos' type="radio" checked={checked === 'datos'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Mis datos</p>
                    </label>
                    {userdetail && userdetail.isAdmin === false ? <label>
                        <input className="radioButton" value='compras' type="radio" checked={checked === 'compras'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Mis Compras</p>
                    </label> : null}
                    { userdetail.isAdmin && <label>
                        <input className="radioButton" value='adminProducts' type="radio" checked={checked === 'adminProducts'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Gestión de Productos</p>
                    </label>}
                    {userdetail.isAdmin &&  <label>
                        <input className="radioButton" value='adminOrders' type="radio" checked={checked === 'adminOrders'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Gestión de Ventas</p>
                    </label>}
                    { userdetail.isAdmin  && <label>
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