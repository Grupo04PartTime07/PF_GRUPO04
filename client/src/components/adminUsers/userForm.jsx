import * as React from "react";
import styles from "./userForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from '../../redux/actions/update_user_admin'
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/actions/get_all_users";

export default function UserForm({usuario, setDisplay}) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState(""); //estos son los datos que se suben con el formulario
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(""); //estos son los datos que se suben con el formulario
  const [dni, setDni] = useState("");
  
  const [isAdmin, setIsAdmin] = useState(""); //este estado va a subir los datos a cloudinary
  const [isBanned, setIsBanned] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input
  const [password, setPassword] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input
  const [cambiaPassword, setCambiaPassword] = useState(false); // este estado guardara las direcciones de cloudinary para pisar el input

  const [errorName, setErrorName] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorDni, setErrorDni] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorPassword, setErrorPassword] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input
  const [errorCambiaPassword, setErrorCanmbiaPassword] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input


  let currentUser = "Guest"
    if(user && user.email) currentUser = user.email
    let profile = JSON.parse(window.localStorage.getItem(`p${currentUser}`))

  function validateName(value) {
    setName(value);
    // if (name=="") {
    //   setErrorName('El campo no puede quedar vacio');
    // } else {
    //   setErrorName("");
    // }
  }

  function validateSurname(value) {
    setSurname(value);
    // if (surname=="") {
    //   setErrorSurname('El campo no puede quedar vacio');
    // } else {
    //   setErrorSurname("");
    // }
  }

  function validateAddress(value) {
    setAddress(value);
    // if (address=="") {
    //   setErrorAddress('El campo no puede quedar vacio');
    // } else {
    //   setErrorAddress("");
    // }
  }

  function validateCity(value) {
    setCity(value);
    //if (city=="") {
    //   setErrorCity('El campo no puede quedar vacio');
    // } else {
    //   setErrorCity("");
    // }
  }

  function validateDni(value) {
    setDni(value);
    let reDni= /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/
    let dniOk=reDni.exec(dni)
    // if () {
    //   setErrorDni('El campo no puede quedar vacio');
    // } else {
    //     setErrorDni("");
    // }
    if (!dni=="" && !dniOk) {
        setErrorDni('El dni ingresado es inválido');
     }else {
       setErrorDni("");
     }
  }

  function validatePassword(value, cambiaPassword) {
    setPassword(value);
    console.log(password)
    let rePassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_$@$!%*?&])([A-Za-z\d_$@$!%*?&]|[^ ]){8,15}$/
    let passwordOk=rePassword.exec(password)
    // if () {
    //   setErrorDni('El campo no puede quedar vacio');
    // } else {
    //     setErrorDni("");
    // }
    if ((cambiaPassword==true && password=="") || (password==" ") || (!password=="" && !passwordOk)) {
        setErrorPassword('La contraseña debe tener al menos 8 caracteres. Entre ellos al menos una letra minúscula, una mayúscula, un número y un carácter especial como !@_#&%*. ');
     }else {
       setErrorPassword("");
     }
  }

  function validateIsAdmin(value) {
    console.log(value +  " " + typeof(value));
    setIsAdmin(value);
    console.log(isAdmin);
  }

  function validateIsBanned(value) {
    console.log(value +  " " + typeof(value));
    setIsBanned(value);
    console.log(isBanned);
  }

  function validateCambiaPassword(value) {
    console.log(value +  " " + typeof(value));
    setCambiaPassword(value);
    console.log(cambiaPassword);
  }




  function parseBoolean(val) { return val === true || val === "true" }


  React.useEffect(() =>{
    if(usuario){
      setName(usuario.name)
      setSurname(usuario.surname)
      setAddress(usuario.address)
      setCity(usuario.city)
      setDni(usuario.dni)
      setIsAdmin(usuario.isAdmin)
      setIsBanned(usuario.isBanned)
      setPassword(usuario.password)
      setCambiaPassword(usuario.cambiaPassword)
    }
  },[])

  function onSubmit(e) {
    e.preventDefault();
    if(usuario){
      const obj = { name: name, surname: surname, email: usuario.email, address:address, 
        city: city, dni:dni, isAdmin:isAdmin, isBanned:isBanned, password:password, cambiaPassword:cambiaPassword };
      dispatch(userUpdate(obj));
      setDisplay("")
      setTimeout(()=>{dispatch(getAllUsers())},2000)
    }
    // else{
    // const obj = { name: name, image: image };
    // dispatch(createCategory(obj));
    // setName("");
    // setImage("");
    // }
  }

  return (
    <div className={styles.centerdiv}>
    <div className={styles.formContainerCat}>
        <form type="POST" className={styles.formDataCat} onSubmit={onSubmit}>
          <div className={styles.formFirstDivCat}>
            <label className={styles.label}>Nombre: </label>
            <input
              className={styles.valido}
              key="name"
              name="name"
              value={name}
              type="text"
              
              onChange={(e) => validateName(e.target.value)}
              autoComplete="off"
            />
            {/* {!errorName ? null : (
              <span className={styles.danger}>{errorName}</span>
            )} */}

            <label className={styles.label}>Apellido: </label>
            <input
              className={styles.valido}
              key="surname"
              name="surname"
              value={surname}
              type="text"
              
              onChange={(e) => validateSurname(e.target.value)}
              autoComplete="off"
            />
            {/* {!errorSurname ? null : (
              <span className={styles.danger}>{errorSurname}</span>
            )} */}

            <label className={styles.label}>Ciudad: </label>
            <input
              className={errorCity ? styles.invalido : styles.valido}
              key="city"
              name="city"
              value={city}
              type="text"
              
              onChange={(e) => validateCity(e.target.value)}
              autoComplete="off"
            />
            {/* {!errorName ? null : (
              <span className={styles.danger}>{errorCity}</span>
            )} */}

            <label className={styles.label}>Dirección: </label>
            <input
              className={errorAddress ? styles.invalido : styles.valido}
              key="address"
              name="address"
              value={address}
              type="text"
              
              onChange={(e) => validateAddress(e.target.value)}
              autoComplete="off"
            />
            {/* {!errorName ? null : (
              <span className={styles.danger}>{errorAddress}</span>
            )} */}

            <label className={styles.label}>Dni: </label>
            <input
              className={errorDni ? styles.invalido : styles.valido}
              key="dni"
              name="dni"
              value={dni}
              type="text"
              
              onChange={(e) => validateDni(e.target.value)}
              autoComplete="off"
            />
           {!errorDni ? null : (
              <span className={styles.danger}>{errorDni}</span>
            )}

            <label className={styles.label}>Es Administrador: </label>
            <input
              className={styles.valido}
              key="isAdmin"
              name="isAdmin"
              value={isAdmin}
              type="checkbox"
              //required
              checked= {parseBoolean(isAdmin)}
              onChange={(e) => validateIsAdmin(e.target.checked)}
              //onChange={(e) => validateIsAdmin(value)}
              //autoComplete="off"
            />
            {/* {!errorName ? null : (
              <span className={styles.danger}>{errorDni}</span>
            )} */}

            <label className={styles.label}>Está Banneado (Prohibicion de acceso): </label>
            <input
              className={styles.valido}
              key="isBanned"
              name="isBanned"
              value={isBanned}
              type="checkbox"
              //required
              checked= {parseBoolean(isBanned)}
              onChange={(e) => validateIsBanned(e.target.checked)}
              //onChange={(e) => validateIsAdmin(value)}
              //autoComplete="off"
            />

            <label className={styles.label}>Setear nueva password(Danger): </label>
            <input
              className={styles.valido}
              key="cambiaPassword"
              name="cambiaPassword"
              value={cambiaPassword}
              type="checkbox"
              //required
              checked= {cambiaPassword}
              onChange={(e) => validateCambiaPassword(e.target.checked)}
              //onChange={(e) => validateIsAdmin(value)}
              //autoComplete="off"
            />

            <label className={styles.label}>Password: </label>
            <input
              className={errorPassword ? styles.invalido : styles.valido}
              key="password"
              name="password"
              value={password}
              type="password"
              placeholder="**********"
              disabled={!cambiaPassword}
              onChange={(e) => validatePassword(e.target.value, cambiaPassword)}
              autoComplete="off"
            />
           {(errorPassword && cambiaPassword) ? <span className={styles.danger}>{errorPassword}</span> : (
              null
            )}
            
          </div>
          {/* {usuario ?  */}
          <button
            name="submit"
            className={styles.button}
            type="submit"
            disabled={ errorDni || (cambiaPassword && errorPassword) ? true : false }
          >
            Modificar Usuario
          </button> 
         
         {/* <button
            name="submit"
            className={styles.button}
            type="submit"
           // disabled={!image || !name || errorName ? true : false}
          >
           Cancelar
          </button> */}
        </form>
    </div>
    </div>
  );
}
