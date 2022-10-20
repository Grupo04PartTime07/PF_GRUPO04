import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect} from "react";
import  {getCategories}  from "../../redux/actions/get_categories";
import {getBrands} from "../../redux/actions/get_brands"
import { createNewProducts } from '../../redux/actions/create_new_products';
import { Link, useHistory} from "react-router-dom";
import "./createProduct.css"

function CreateProduct() {
    const dispatch = useDispatch();
    const history = useHistory();
    let category = useSelector((state) => state.categories)
    let brands = useSelector((state) => state.brand)

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
    },[])

    const[input,setInput] = useState({
        name:"",
        price:"",
        description:"",
        image:[],
        categories:[],
        stock:"",
        score:"",
        brand:""
    })

    
    
    const [imagen, setImagen] = useState("");
    const [error, setError] = useState("");
    const [button, setButton] = useState({
        complete: false
    })

    function handleChange(e){
          setInput({...input, [e.target.name]: e.target.value});
          setError(validate({...input,[e.target.name]: e.target.value}));
      }

    
    
    function validate(input){
        let errors = {};
        if(!input.name){
            errors.name = "El campo no debe quedar vacio";
            }
        if(!input.price){
                errors.price = "El campo no debe quedar vacio";
            }else if(input.price <= 0){
                errors.price = "El precio no puede ser menor a 0";
            }
        if(!input.description){
                errors.description = "El campo no debe quedar vacio";
            }else if(input.description.length > 500){
                errors.description = "La descripcion no puede tener mas de 500 caracteres"
            }
        if(!input.image){
                errors.image = "Debes subir al menos 1 imagen";
            }else if(input.image.length > 5){
                errors.image = "No puedes subir mas de 5 imagenes"
            }
        if(!input.categories.length < 0){
                errors.categories = "Debes elegir al menos 1 categoria";
            }
        if(!input.stock){
                errors.stock = "El campo no puede quedar vacio";
            }else if(input.stock < 1){
                errors.stock = "Debes tener al menos 1 articulo";
            }
        if(!input.score){
                errors.score = "El campo no puede quedar vacio"
            }else if(input.score < 0 || input.score > 5){
                errors.score = "El rating debe estar entre 0 y 5"
            }
        if(!input.brand){
                errors.brand = "El campo no puede quedar vacio"
            }
        if(errors.name || errors.price || errors.description || errors.image || errors.categories || errors.stock || errors.score || errors.brand ){
            setButton({
              complete:false
            })
          }else{
            setButton({
              complete:true
            })
          }
        
        return errors;  
    }

    function handleImage(e){ // agrega una nueva direccion de imagen al array de imagenes
      e.preventDefault();
      let imagen = document.getElementById("imagen").value

      console.log(imagen)
      setImagen(          
          e.target.value
      )
      
    }

    function handleButton(e){ // agrega una nueva direccion de imagen al array de imagenes
        e.preventDefault();
        let imagenes = document.getElementById("imagen").value

        console.log(imagenes)
        setInput({
            ...input,
            image: [...input.image, imagen]
        })
        
        setImagen("")
        
      }

    
    function handleSelect(e){
        if(input.categories.length < 5){
            setInput({
              ...input,
              categories:[...input.categories,e.target.value]
            })
    
            setError(validate({
              ...input,
            categories:[...input.categories,e.target.value]
          
          }))
        }
      }
      function handleBrand(e){
        if(!input.brand){
          setInput({...input, brand: e.target.value});
          setError(validate({...input,brand: e.target.value}));
        }
      }
    
    function handleDelete(e) {
      let nombre = e.target.innerText;
      setInput({
        ...input,
        categories:input.categories.filter(e => e !== nombre)
      })
    }

    function handleDeleteBrand(e) {
      setInput({
        ...input,
        brand: ""
      })
    }

    function handleSubmit(e){ // crea el nuevo articulo, faltaria agregarle en el dispatch la accion que lo crea
        e.preventDefault(e);

        dispatch(createNewProducts(input));
        alert("articulo creado");
        setInput({
            name:"",
            price:"",
            description:"",
            image:[],
            categories:[],
            stock:"",
            score:"",
            brand:""
        });
        history.push("/");
    }

    function handleReset(e){ // borra todos los inputs, setea los errores en vacio y vuelve a dehabilitar el boton de crear
        e.preventDefault(e);
        setInput({
            name:"",
            price:"",
            description:"",
            image:[],
            categories:[],
            stock:"",
            score:"",
            brand:""
        });
        setError("")
        setButton({
            complete:false
        })
    }

  return (
    <div>
        <h1>Ingresa un Producto</h1>
        <form className="formContainer" onSubmit={e => handleSubmit(e)}>
        <div className='formData'>
          <div className='formFirstDiv'>  
            <label>Nombre:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.name? "danger":"normal"}>{error.name}</p>
            
            <label>Descripcion:</label>
            <textarea
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
            
            <p className={error.description?"danger":"normal"}>{error.description}</p>
            <label>Precio:</label>
            <input
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.price?"danger":"normal"}>{error.price}</p>
            <label>Imagen:</label>
            <input
              id="imagen"
              type="text"
              value={imagen}
              name="image"
              onChange={(e) => handleImage(e)}
            />
            <button className="button" onClick={e => handleButton(e)}>Agregar</button>
            <p className={error.image?"danger":"normal"}>{error.image}</p>
          </div>
          <div className="formSecondDiv">
            <label>Categoria:</label>
            <select name={input.categories} onChange={e => handleSelect(e)}>
            {category && category.map(el =>
                <option value={el.name}>{el.name}</option>

            )}
            </select>
            <div className="formCategories">{input.categories? input.categories.map(el => <div className="inputCategories"><p onClick={e => handleDelete(e)}>{el}</p></div>):""}</div>
            <p className={error.categories?"danger":"normal"}>{error.categories}</p>
            <label>Stock:</label>
            <input
              type="number"
              value={input.stock}
              name="stock"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.stock?"danger":"normal"}>{error.stock}</p>

            <label>Valoracion:</label>
            <input
              type="number"
              value={input.score}
              name="score"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.score?"danger":"normal"}>{error.score}</p>

            <label>Marca:</label>
            <select name={input.brand} onChange={e => handleBrand(e)}>
            {brands && brands.map(el =>
                <option value={el.name}>{el.name}</option>

            )}
            </select>
            <div className="formCategories">{input.brand? <div className="inputCategories"><p onClick={e => handleDeleteBrand(e)}>{input.brand}</p></div>:""}</div>
            <p className={error.brand?"danger":"normal"}>{error.brand}</p>
          </div>
        </div> 
          <div >
            <button className="button buttonLink"><Link to="/" className="buttonLink">Volver</Link></button>
            {button.complete === false ? <button disabled="disabled" className="button disable">Crear</button> : <button type="submit" className="button">Crear</button>}
            <button type="submit" onClick={e => handleReset(e)} className="button">Limpiar</button>
          </div>
        </form>
    </div>
  )
}

export default CreateProduct
