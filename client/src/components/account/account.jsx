import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { guestCreateAccount } from "../../redux/actions/guest_create_account";
import { Link, useHistory } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import "./account.css"

function CreateAccount() {
    const dispatch = useDispatch();
    const history = useHistory();
    let account = useSelector((state) => state.account)

    useEffect(() => {
        dispatch(guestCreateAccount)
    }, [])

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    //if(user && user.email) currentUser = user.email
    //let profile = JSON.parse(window.localStorage.getItem(`p${currentUser}`))
    console.log(user,"soy el user")
    // async function callProtectedApiToken2(){
    //     try{
    //       const token = await getAccessTokenSilently();
    //       const response = await axios.post('http://localhost:3001/users' , {
    //             name: user.name || " " , 
    //             email: user.email
    //         },{headers:{
    //         authorization:`Bearer ${token}`,
    //       }});
    //       user.isAdmin = response.data.userRegisted.isAdmin;
    //       user.isBanned = response.data.userRegisted.isAdmin;
    //       window.localStorage.setItem(`p${user.email}`, user.isAdmin)
    //     }catch(error) {
    //       console.log(error);
    //     }
    // }

    const [input, setInput] = useState({
        name: user.given_name? user.given_name:"",
        lastName: user.family_name? user.family_name:"",
        mail: user.email? user.email:"",
        address: "",
        country:"",
        dni: ""
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
        if (!input.lastName) {
            errors.lastName = "El campo no debe quedar vacio";
        } else if (input.lastName <= 0) {
            errors.lastName = "El precio no puede ser menor a 0";
        }
        if (!regexEmail.test(input.mail)) {
            errors.mail = "La dirección de email es incorrecta.";
        } 
        if (!input.mail) {
            errors.mail = "El campo no debe quedar vacio";
        } 
        
        

        if (errors.name || errors.lastName || errors.mail) {
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


    // function handleSelect(e) {
    //     setInput({
    //         ...input,
    //         account: [...input.account, e.target.value]
    //     })

    //     setError(validate({
    //         ...input,
    //         account: [...input.account, e.target.value]

    //     }))
    // }


     function handleSubmit(e) { // crea el nuevo usuario, faltaria agregarle en el dispatch la accion que lo crea
        e.preventDefault(e);

        //dispatch(newProducts(input));
        //alert("usuario creado");
        // setInput({
        //     name: "",
        //     lastName: "",
        //     mail: "",
        //     address: "",
        //     country:"",
        //     dni: ""
        // });
        // history.push("/home");
    }

    function handleReset(e) { // borra todos los inputs, setea los errores en vacio y vuelve a dehabilitar el boton de crear
        e.preventDefault(e);
        setInput({
            name: "",
            lastName: "",
            mail: "",
            address: "",
            country:"",
            dni: ""
        });
        setError("")
        setButton({
            complete: false
        })
    }

    return (
        <div>
            
            <form className="formContainer" onSubmit={e => handleSubmit(e)}>
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
                            value={input.lastName}
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                            disabled
                        />:<input
                        type="text"
                        value={input.lastName}
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                    />}

                        <p className={error.lastName ? "danger" : "normal"}>{error.lastName}</p>
                        <label>E-mail:</label>
                        {user.email?<input
                            type="text"
                            value={input.mail}
                            name="mail"
                            onChange={(e) => handleChange(e)}
                            disabled
                        />:<input
                        type="text"
                        value={input.mail}
                        name="mail"
                        onChange={(e) => handleChange(e)}
                    />}
                        <p className={error.mail ? "danger" : "normal"}>{error.mail}</p>
                    
                    
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
                            value={input.country}
                            name="country"
                            onChange={(e) => handleChange(e)}
                        />
                        <p className={error.country ? "danger" : "normal"}>{error.country}</p>

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
                    {button.complete === false ? <button disabled="disabled" className="button disable">Crear</button> : <button type="submit" className="button">Crear</button>}
                    <button type="boton" onClick={e => handleReset(e)} className="button">Limpiar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount
