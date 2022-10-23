import React from "react";
import CreateAccount from "../account/account";
import CategoryForm from "../categoryForm/categoryForm";
import CreateProduct from "../createProduct/CreateProduct";
import './profile.css'
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import {useEffect} from 'react';

export default function Profile(){
    
    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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
          
          console.log(response.userRegisted);
          console.log(response.message);
          console.log(response.data);
          console.log(user)
        }catch(error) {
          console.log(error);
        }
    }
      
    useEffect(() => {
        window.scrollTo(0, 0)
        if (isAuthenticated){
            return () => {
                const usuario = callProtectedApiToken2();
                console.log(usuario);
            }
        }
    })
    
    const [ checked, setChecked ] = React.useState('datos')

    function handleCheck(e){
        setChecked(e.target.value);
    };

    return(
        <div className="profile">
            <div className="profileMenu">
                <h2 className="menuTitle">Bienvenido</h2>
                <h3 className="menuTitle">{isAuthenticated && user.name}</h3>
                <div className="list">
                    <label>
                        <input className="radioButton" value='datos' type="radio" checked={checked === 'datos'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Mis datos</p>
                    </label>
                    {isAuthenticated && user.isAdmin && <label>
                        <input className="radioButton" value='createCategorie' type="radio" checked={checked === 'createCategorie'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Crear categoría</p>
                    </label>}
                    {isAuthenticated && user.isAdmin && <label>
                        <input className="radioButton" value='createProduct' type="radio" checked={checked === 'createProduct'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Crear producto</p>
                    </label>}

                </div>
            </div>
            <div className="component">
                {checked === 'datos' ? <CreateAccount/> : checked === 'createProduct' ? <CreateProduct/> : checked === 'createCategorie' ? <CategoryForm/> : <CreateAccount/>}
            </div>
        </div>
    )
}