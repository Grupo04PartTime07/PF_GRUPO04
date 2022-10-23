import React from "react";
import CreateAccount from "../account/account";
import CategoryForm from "../categoryForm/categoryForm";
import CreateProduct from "../createProduct/CreateProduct";
import './profile.css'

export default function Profile(){
    const [ checked, setChecked ] = React.useState('datos')

    function handleCheck(e){
        setChecked(e.target.value);
    };

    return(
        <div className="profile">
            <div className="profileMenu">
                <h2 className="menuTitle">Mi perfil</h2>
                <div className="list">
                    <label>
                        <input className="radioButton" value='datos' type="radio" checked={checked === 'datos'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Mis datos</p>
                    </label>
                    <label>
                        <input className="radioButton" value='createCategorie' type="radio" checked={checked === 'createCategorie'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Crear categoría</p>
                    </label>
                    <label>
                        <input className="radioButton" value='createProduct' type="radio" checked={checked === 'createProduct'} onChange={(e) => handleCheck(e)}/>
                        <p className="menuText">Crear producto</p>
                    </label>

                </div>
            </div>
            <div className="component">
                {checked === 'datos' ? <CreateAccount/> : checked === 'createProduct' ? <CreateProduct/> : checked === 'createCategorie' ? <CategoryForm/> : <CreateAccount/>}
            </div>
        </div>
    )
}