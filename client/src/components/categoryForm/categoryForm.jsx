import * as React from "react";
import styles from "./categoryFormDos.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/actions/create_category";
import { updateCategory } from '../../redux/actions/update_category'
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { Image } from "cloudinary-react";
import { getCategories } from "../../redux/actions/get_categories";

export default function CategoryForm({category, setDisplay}) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState(""); //estos son los datos que se suben con el formulario
  const [imagen, setImagen] = useState(""); //este estado va a subir los datos a cloudinary
  const [imageData, setimageData] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input
  const [errorName, setErrorName] = useState("");

  let currentUser = "Guest"
    if(user && user.email) currentUser = user.email
    let profile = JSON.parse(window.localStorage.getItem(`p${currentUser}`))

  function validateName(value) {
    setName(value);
    if (!name.length) {
      setErrorName('El campo no puede quedar vacio');
    } else {
      setErrorName("");
    }
  }

  const updateImage = (e) => {
    setImagen(e.target.files[0]);
  };


  function handleButton(e) {
    // pisa el input con los datos que hay en imagenes
    e.preventDefault();
    setImage(imageData);
  }

  const uploadImage = (e) => {
    // carga la imagen selecionada a cloudinary
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imagen);
    formData.append("upload_preset", "prueba");

    axios
      .post("https://api.cloudinary.com/v1_1/de2od3piw/image/upload", formData)

      .then((res) => setimageData(res.data.url));
  };

  const handleDeleteImage = (e) => {
    //borra una preview al hacer click sobre la misma
    setimageData("")
  };

  React.useEffect(() =>{
    if(category){
      setName(category.name)
      setImage(category.image)
      setimageData(category.image)
    }
  },[])

  function onSubmit(e) {
    e.preventDefault();
    if(category){
      const obj = { name: name, image: image, id: category.id};
      dispatch(updateCategory(obj));
      setDisplay("")
      setTimeout(()=>{dispatch(getCategories())},2000)
    }else{
    const obj = { name: name, image: image };
    dispatch(createCategory(obj));
    setName("");
    setImage("");
    }
  }

  return (
    <div className={styles.centerdiv}>
    <div className={styles.formContainerCat}>
        <form type="POST" className={styles.formDataCat} onSubmit={onSubmit}>
          <div className={styles.formFirstDivCat}>
            <label className={styles.label}>Nombre: </label>
            <input
              className={errorName ? styles.invalido : styles.valido}
              key="name"
              name="name"
              value={name}
              type="text"
              required
              onChange={(e) => validateName(e.target.value)}
              autoComplete="off"
            />
            {!errorName ? null : (
              <span className={styles.danger}>{errorName}</span>
            )}

            <label>Imagen a:</label>
            <div className={styles.formImageCat}>
              <input
                type="file"
                onChange={(e) => updateImage(e)}
                className={styles.formInput}
              />
              <button className={styles.button} onClick={uploadImage}>
                Agregar
              </button>
            </div>
            <div className={styles.previewCenter}>
              <h5>Vista Previa</h5>
              {/* crea la tira de imagenes pequeñas */}
              <div className={styles.formContainerPreview}>
                {imageData && (
                  <Image
                    className={styles.formImagenPreview}
                    cloudName="de2od3piw"
                    publicID={imageData}
                    onClick={(e) => handleDeleteImage(e)}
                  />
                )}
              </div>

              <button className={styles.button} onClick={handleButton}>
                Aceptar
              </button>
            </div>
          </div>
          {category ? 
          <button
            name="submit"
            className={styles.button}
            type="submit"
            disabled={!image || !name || errorName ? true : false}
          >
            Modificar Categoria
          </button> : <button
            name="submit"
            className={styles.button}
            type="submit"
            disabled={!image || !name || errorName ? true : false}
          >
            Crear Categoria
          </button>}
        </form>
    </div>
    </div>
  );
}
