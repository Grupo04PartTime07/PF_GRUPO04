import * as React from 'react';
import styles from "./categoryFormDos.module.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createCategory } from '../../redux/actions/create_category';

export default function CategoryForm() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const [errorName, setErrorName] = useState("");
    const [errorImage, setErrorImage] = useState("");

    function validateName(value) {
        if(!/^[a-zA-Z]+$/.test(value)) { // solo caracteres a-z minusculas y al menos uno
        setErrorName('Solo caracteres de la "a-z" minusculas y al menos uno');
        } else {
        setErrorName('');
        }
        setName(value);
        }

    function validateImage (value) {
        if (!/^(http[s]?)/.test(value)){
        setErrorImage('La Url de la imagen debe comenzar con http')
        } else {
        setErrorImage('');
        }
        setImage(value);
        }
   
        function onSubmit (e) {
            e.preventDefault() 
            const obj = { name: name,image: image, } 
            //console.log(obj)
            dispatch(createCategory(obj));
            setName("");
            setImage("");
            }

return (
        <div>
            <h1>Ingresa una Categoria</h1>
            <form type="POST"  className={styles.formContainer} onSubmit={onSubmit}>
            
            <label className={styles.label}>Name: </label>
             <input className={errorName? styles.invalido : styles.valido} 
             key="name" name="name" value={name} type="text" required onChange={(e) => validateName(e.target.value)}
             autoComplete='off'/>
             {!errorName ? null : <span className={styles.danger}>{errorName}</span>} 

             <label className={styles.imglabel}>Image: </label> 
             <input className={errorImage? styles.invalido : styles.valido}
             key="image" name="image" value={image} type="text"  required onChange={(e) => validateImage(e.target.value)}
             autoComplete='off'/>
             {!errorImage ? null : <span className={styles.danger}>{errorImage}</span> }

             <button name="submit"className={styles.button} type="submit"  disabled={ !image || errorImage  || !name || errorName ? true : false} >Crear Categoria</button> 

            </form>
        </div>
        
    )
}
