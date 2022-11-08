import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { guestCreateAccount } from "../../redux/actions/guest_create_account";
import { clientUpdate } from "../../redux/actions/update_user";
import { Link, useHistory } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
import "./account.css"

function CreateAccount() {
    const dispatch = useDispatch();
    const history = useHistory();
    let userDetail = useSelector((state) => state.userDetail)

    

    useEffect(() => {
        dispatch(guestCreateAccount)
        
    }, [])

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    const [input, setInput] = useState({
        name: user.given_name? user.given_name:"",
        surname: user.family_name? user.family_name:"",
        email: user.email? user.email:"",
        address: userDetail.address? userDetail.address:"",
        city:userDetail.city? userDetail.city:"",
        dni: userDetail.dni? userDetail.dni:""
    })

    const [error, setError] = useState("");
    const [button, setButton] = useState({
        complete: false
    })

    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError(validate({ ...input, [e.target.name]: e.target.value }));
    }

const regexEmail =/\S+@\S+\.\S+/

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "El campo no debe quedar vacio";
        }
        if (!input.surname) {
            errors.surname = "El campo no debe quedar vacio";
        } else if (input.surname <= 0) {
            errors.surname = "El precio no puede ser menor a 0";
        }
        if (!regexEmail.test(input.email)) {
            errors.email = "La dirección de email es incorrecta.";
        } 
        if (!input.email) {
            errors.email = "El campo no debe quedar vacio";
        } 
        
        

        if (errors.name || errors.surname || errors.email) {
            setButton({
                complete: false
            })
        } else {
            setButton({
                complete: true
            })
        }

        return errors;
    }


    function handleSubmit(e) { // modifica el nuevo usuario, faltaria agregarle en el dispatch la accion que lo crea
        e.preventDefault(e);

        dispatch(clientUpdate(input));
        
        
        history.push("/");
    }

    function handleReset(e) { // borra todos los inputs, setea los errores en vacio y vuelve a dehabilitar el boton de crear
        e.preventDefault(e);
        setInput({
            name: "",
            surname: "",
            email: "",
            address: "",
            city:"",
            dni: ""
        });
        setError("")
        setButton({
            complete: false
        })
    }

    return (
        <div>
            
            <form className="formContainer formContainerAccount" onSubmit={e => handleSubmit(e)}>
                <div className='formData'>
                    <div className='formFirstDiv'>
                        <label>Nombre:</label>
                        {user.given_name?<input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            disabled
                        />:<input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        />}
                        <p className={error.name ? "danger" : "normal"}>{error.name}</p>

                        <label>Apellido:</label>
                        {user.family_name?<input
                            type="text"
                            value={input.surname}
                            name="surname"
                            onChange={(e) => handleChange(e)}
                            disabled
                        />:<input
                        type="text"
                        value={input.surname}
                        name="surname"
                        onChange={(e) => handleChange(e)}
                    />}

                        <p className={error.surname ? "danger" : "normal"}>{error.surname}</p>
                        <label>E-mail:</label>
                        {user.email?<input
                            type="text"
                            value={input.email}
                            name="mail"
                            onChange={(e) => handleChange(e)}
                            disabled
                        />:<input
                        type="text"
                        value={input.email}
                        name="mail"
                        onChange={(e) => handleChange(e)}
                    />}
                        <p className={error.email ? "danger" : "normal"}>{error.email}</p>
                    
                    
                    <label>Domicilio:</label>
                        <input
                            type="text"
                            value={input.address}
                            name="address"
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={error.address ? "danger" : "normal"}>{error.address}</p>

                        <label>Ciudad:</label>
                        <input
                            type="text"
                            value={input.city}
                            name="city"
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={error.city ? "danger" : "normal"}>{error.city}</p>

                        <label>D.N.I.:</label>
                        <input
                            type="text"
                            value={input.dni}
                            name="dni"
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={error.dni ? "danger" : "normal"}>{error.dni}</p>
                    </div>
                </div>
                <div >
                <button className="button buttonLink"><Link to="/" className="buttonLink">Volver</Link></button>
                    {button.complete === false ? <button disabled="disabled" className="button disable">Guardar</button> : <button type="submit" className="button">Guardar</button>}
                    <button type="boton" onClick={e => handleReset(e)} className="button">Limpiar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount
