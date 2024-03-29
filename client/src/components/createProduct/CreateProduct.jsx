import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect} from "react";
import { getCategories }  from "../../redux/actions/get_categories";
import { getBrands } from "../../redux/actions/get_brands"
import { createNewProducts } from '../../redux/actions/create_new_products';
import { getAdminProducts } from '../../redux/actions/get_admin_products'
import { updateProduct } from '../../redux/actions/update_product'
import { Link } from "react-router-dom";
import "./createProduct.css"
import axios from 'axios';
import { Image } from "cloudinary-react";
    

function CreateProduct({product, setDisplay, cleanCurrent}) {
  const dispatch = useDispatch();
  let category = useSelector((state) => state.categories)
  let brands = useSelector((state) => state.brand)

  const [imagen, setImagen] = useState(""); //este estado va a subir los datos a cloudinary
  const [imageData, setimageData] = useState({imageReel: [], });
    // este estado guardara las direcciones de cloudinary para pisar el input

  const [error, setError] = useState("");
  const [button, setButton] = useState({complete: false,});

  const[input,setInput] = useState({
    name:"",
    price:"",
    description:"",
    image:[],
    categories:[],
    stock:"",
    brand:"",
    brandimage:""
  })

  useEffect(() => {
    if(product){
      setInput({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image && product.image,
        categories: product.categories,
        stock: product.stock,
        brand: product.brand,
      })
      //setimageData({imageReel: product.image && product.image,})
    }
      dispatch(getCategories());
      dispatch(getBrands());
  },[])

    function handleChange(e){
      if(e.target.name === "brand"){
        setInput({...input, [e.target.name]: e.target.value, brandimage: brands.find(b =>  b.name === e.target.value).image})
        setError(validate({...input,[e.target.name]: e.target.value}));
      }else{
        setInput({...input, [e.target.name]: e.target.value});
        setError(validate({...input,[e.target.name]: e.target.value}));
      }
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
        if(!input.brand){
                errors.brand = "El campo no puede quedar vacio"
            }
        if(errors.name || errors.price || errors.description || errors.image || errors.categories || errors.stock || errors.brand ){
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

  const updateImage = (e) => {
    setImagen(e.target.files[0]);
  };

  function handleImage(data) {
    // pisa el input con los datos que hay en imagenes   
    setInput({
      ...input,
      image: data,
    });

    setError(
      validate({
        ...input,
        image: data,
      })
    );

    setImagen("");
  }

  const uploadImage = (e) => {
    // carga la imagen selecionada a cloudinary
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imagen);
    formData.append("upload_preset", "prueba");

    axios
      .post("https://api.cloudinary.com/v1_1/de2od3piw/image/upload", formData)

      .then((res) => {
        setInput({ ...input,
          image: [...input.image, res.data.url],
        })
        setError(
          validate({
            ...input,
            image: [...input.image, res.data.url],
          })
        )
        setImagen("");
      })

  };

  function handleSelect(e) {
    if (input.categories.length < 5) {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });

      setError(
        validate({
          ...input,
          categories: [...input.categories, e.target.value],
        })
      );
    }
  }

  function handleDelete(e) {
    let nombre = e.target.innerText;
    setInput({
      ...input,
      categories: input.categories.filter((e) => e !== nombre),
    });
  }

  const handleDeleteImage = (e) => { //borra una preview al hacer click sobre la misma
    let imageSource = e.target.src;

    setInput({
      ...input,
      image: input.image.filter((e) => e !== imageSource),
    });
  };

  function handleSubmit(e) {
    // crea el nuevo articulo, faltaria agregarle en el dispatch la accion que lo crea
    e.preventDefault(e);
    if(product){
      dispatch(updateProduct(product.id,input))
      setDisplay("")
      setTimeout(()=>{dispatch(getAdminProducts())},2000)
    }else{
      dispatch(createNewProducts(input));
      setInput({
        name: "",
        price: "",
        description: "",
        image: [],
        categories: [],
        stock: "",
        brand: "",
        brandimage: ""
      });
    }
  }

  function handleReset(e) {
    // borra todos los inputs, setea los errores en vacio y vuelve a dehabilitar el boton de crear
    e.preventDefault(e);
    setInput({
      name: "",
      price: "",
      description: "",
      image: [],
      categories: [],
      stock: "",
      brand: "",
      brandimage: ""
    });
    setError("");
    setButton({
      complete: false,
    });
  }

  return (
    
    <div>        
        
      <form className="formContainerProd" onSubmit={e => handleSubmit(e)}>
        <div className='formDataProd'>
          <div className='formFirstDivProd'>  

            <label>Nombre:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.name ? "danger" : "normal"}>{error.name}</p>

            <label>Precio:</label>
            <input
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.price ? "danger" : "normal"}>{error.price}</p>

            <label>Inventario:</label>
            <input
              type="number"
              value={input.stock}
              name="stock"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.stock ? "danger" : "normal"}>{error.stock}</p>

            <label>Categoria (Min 1 - Max 5):</label>
            <select
              name={input.categories}
              onChange={(e) => handleSelect(e)}
              defaultValue=""
            >
              <option disabled value="">
                Seleccione una Categoria
              </option>
              {category &&
                category.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
            </select>
            <div className="formCategories">
              {input.categories
                ? input.categories.map((el) => (
                    <div className="inputCategories">
                      <p onClick={(e) => handleDelete(e)}>{el}</p>
                    </div>
                  ))
                : ""}
            </div>
            <p className={error.categories ? "danger" : "normal"}>
              {error.categories}
            </p>

            <label>Marca:</label>
            <select
              name='brand'
              value={input.brand}
              onChange={(e) => handleChange(e)}
            > 
              <option disabled value="">Seleccione una Marca</option>
              {brands &&
                brands.map((el) => <option value={el.name}>{el.name}</option>)}
            </select>
            { input.brandimage ? <img src={input.brandimage}></img>:null}
            
            <p className={error.brand ? "danger" : "normal"}>{error.brand}</p>
          </div>
          <div className="formSecondDivProd">        
            <label>Descripción:</label>
            <textarea
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />

            <p className={error.description ? "danger" : "normal"}>
              {error.description}
            </p>
          </div>
          <div className="formThirdDivProd">
          
            <label>Imagen (Min 1 - Max 5):</label>
            <div className='formImageProd'>
              <input type="file" onChange={(e) => updateImage(e)} className="formInput" />
              <button className="button" onClick={uploadImage}>
                Agregar
              </button>
            </div>
            <h5>Vista Previa</h5>
            {/* crea la tira de imagenes pequeñas */}
            <div className="formContainerPreview"> 
              {input.image &&
                input.image.map((e) => (
                  <Image
                    className="formImagenPreview"
                    cloudName="de2od3piw"
                    publicID={e}
                    onClick={(e) => handleDeleteImage(e)}
                  />
                ))}
            </div>
            
            {/*<button className="button" onClick={handleButton}>
              Aceptar
                </button>*/}
            <p className={error.image ? "danger" : "normal"}>{error.image}</p>
          </div>



        </div>
        <div>
          {product ? <button className="button buttonLink" onClick={() => cleanCurrent()}>
              Cancelar
          </button> : <button className="button buttonLink">
            <Link to="/" className="buttonLink">
              Volver
            </Link>
          </button>}
          {button.complete === false ? product ? (
            <button disabled="disabled" className="button disable">
              Modificar
            </button>
          ) : (
            <button disabled="disabled" className="button disable">
              Crear
            </button>
          ) : product ? (
            <button type="submit" className="button">
              Modificar
            </button>
          ) : (
            <button type="submit" className="button">
              Crear
            </button>
          )}
          <button
            type="submit"
            onClick={(e) => handleReset(e)}
            className="button"
          >
            Limpiar
          </button>
        </div>

        </form> 
    </div>
  );
}

export default CreateProduct;
