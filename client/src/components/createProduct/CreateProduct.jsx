import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCategories } from "../../redux/actions/get_categories";
import { getBrands } from "../../redux/actions/get_brands";
import { createNewProducts } from "../../redux/actions/create_new_products";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Image } from "cloudinary-react";
import "./createProduct.css";

function CreateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  let category = useSelector((state) => state.categories);
  let brands = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    image: [],
    categories: [],
    stock: "",
    brand: "",
    brandimage:""
  });

  const [imagen, setImagen] = useState(""); //este estado va a subir los datos a cloudinary
  const [imageData, setimageData] = useState({
    // este estado guardara las direcciones de cloudinary para pisar el input
    imageReel: [],
  });
  const [error, setError] = useState("");
  const [button, setButton] = useState({
    complete: false,
  });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "El campo no debe quedar vacio";
    }
    if (!input.price) {
      errors.price = "El campo no debe quedar vacio";
    } else if (input.price <= 0) {
      errors.price = "El precio no puede ser menor a 0";
    }
    if (!input.description) {
      errors.description = "El campo no debe quedar vacio";
    } else if (input.description.length > 500) {
      errors.description =
        "La descripcion no puede tener mas de 500 caracteres";
    }
    if (input.image.length <= 0) {
      errors.image = "Debes subir al menos 1 imagen";
    } else if (input.image.length > 5) {
      errors.image = "No puedes subir mas de 5 imagenes";
    }
    if (input.categories.length <= 0) {
      errors.categories = "Debes elegir al menos 1 categoria";
    } else if(input.categories.length > 5){
      errors.categories = "Puedes elegir hasta 5 categorias";
    }

    if (!input.stock) {
      errors.stock = "El campo no puede quedar vacio";
    } else if (input.stock < 1) {
      errors.stock = "Debes tener al menos 1 articulo";
    }
    if (!input.brand) {
      errors.brand = "El campo no puede quedar vacio";
    }
    if (
      errors.name ||
      errors.price ||
      errors.description ||
      errors.image ||
      errors.categories ||
      errors.stock ||
      errors.brand
    ) {
      setButton({
        complete: false,
      });
    } else {
      setButton({
        complete: true,
      });
    }

    return errors;
  }

  const updateImage = (e) => {
    setImagen(e.target.files[0]);
  };

  // function handleImage(e){ // agrega una nueva direccion de imagen al array de imagenes
  //   e.preventDefault();
  //   let imagen = document.getElementById("imagen").value

  //   console.log(imagen)
  //   setImagen(
  //       e.target.value
  //   )

  // }

  function handleButton(e) {
    // pisa el input con los datos que hay en imagenes
    e.preventDefault();
   
    setInput({
      ...input,
      image: imageData.imageReel,
    });

    setError(
      validate({
        ...input,
        image: imageData.imageReel,
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

      .then((res) =>
        setimageData({
          imageReel: [...imageData.imageReel, res.data.url],
        })
      );
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
  function handleBrand(e) {
    if (!input.brand) {
      setInput({ ...input, brand: e.target.value });
      let selectedbrand = brands.filter(b => b.name === e.target.value)
      setInput({...input, brandimage: selectedbrand[0].image})
      setError(validate({ ...input, brand: e.target.value }));
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
    let imageSurce = e.target.src;

    setimageData({
      imageReel: imageData.imageReel.filter((e) => e !== imageSurce),
    });
  };

  function handleDeleteBrand(e) {
    setInput({
      ...input,
      brand: "",
    });
  }

  function handleSubmit(e) {
    // crea el nuevo articulo, faltaria agregarle en el dispatch la accion que lo crea
    e.preventDefault(e);

    dispatch(createNewProducts(input));
    alert("Articulo Creado");
    setInput({
      name: "",
      price: "",
      description: "",
      image: [],
      categories: [],
      stock: "",
      brand: "",
    });
    history.push("/");
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
    });
    setError("");
    setButton({
      complete: false,
    });
  }

  return (
    <div>
      <h1>Ingresa un Producto</h1>
      <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
        <div className="formData">
          <div className="formFirstDiv">
            <label>Nombre:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.name ? "danger" : "normal"}>{error.name}</p>

            <label>Descripcion:</label>
            <textarea
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />

            <p className={error.description ? "danger" : "normal"}>
              {error.description}
            </p>
            <label>Precio:</label>
            <input
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.price ? "danger" : "normal"}>{error.price}</p>

            <label>Imagen (Min 1 - Max 5):</label>
            <input type="file" onChange={(e) => updateImage(e)} className="formInput" />
            {/* <input
              id="imagen"
              type="file"
              value={imagen}
              name="image"
              onChange={(e) => updateImage(e)}
            /> */}
            <button className="button" onClick={uploadImage}>
              Agregar
            </button>
            
            {/* crea la tira de imagenes pequeñas */}
            <div className="formContainerPreview"> 
              {imageData.imageReel &&
                imageData.imageReel.map((e) => (
                  <Image
                    className="formImagenPreview"
                    cloudName="de2od3piw"
                    publicID={e}
                    onClick={(e) => handleDeleteImage(e)}
                  />
                ))}
            </div>
            <button className="button" onClick={handleButton}>
              Aceptar
            </button>
            <p className={error.image ? "danger" : "normal"}>{error.image}</p>
          </div>

          <div className="formSecondDiv">
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
            <label>Stock:</label>
            <input
              type="number"
              value={input.stock}
              name="stock"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.stock ? "danger" : "normal"}>{error.stock}</p>

            <label>Marca:</label>
            <select
              name={input.brand}
              onChange={(e) => handleBrand(e)}
              defaultValue=""
            >
              <option disabled value="">
                Seleccione una Marca
              </option>
              {brands &&
                brands.map((el) => <option value={el.name}>{el.name}</option>)}
            </select>
            {input.brandimage && <img src={input.brandimage}></img>}
            <div className="formCategories">
              {input.brand ? (
                <div className="inputCategories">
                  <p onClick={(e) => handleDeleteBrand(e)}>{input.brand}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <p className={error.brand ? "danger" : "normal"}>{error.brand}</p>
          </div>
        </div>
        <div>
          <button className="button buttonLink">
            <Link to="/" className="buttonLink">
              Volver
            </Link>
          </button>
          {button.complete === false ? (
            <button disabled="disabled" className="button disable">
              Crear
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
