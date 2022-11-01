import * as React from "react";
import styles from "./brandForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrand } from "../../redux/actions/create_brand";
//import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import { Image } from "cloudinary-react";
import { getBrands } from "../../redux/actions/get_brands";
import { updateBrand } from "../../redux/actions/update_brand";


export default function BrandForm({brand, setDisplay}) {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagen, setImagen] = useState(""); //este estado va a subir los datos a cloudinary
  const [imageData, setimageData] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input
  const [errorName, setErrorName] = useState("");

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

  React.useEffect(() =>{
    if(brand){
      setName(brand.name)
      setImage(brand.image)
      setimageData(brand.image)
    }
  },[])

  const handleDeleteImage = (e) => {
    console.log("imagen", e)
    //borra una preview al hacer click sobre la misma
    setimageData("")
  };


  function validateName(value) {
    console.log("input", /^[a-zA-Z]+$/.test(value))
    setName(value);
    if (!name.length) {
      setErrorName('El campo no puede quedar vacio');
    } else {
      setErrorName("");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if(brand){
      const obj = { name: name, image: image, id: brand.id};
      dispatch(updateBrand(obj));
      setDisplay("")
    } else {
      const obj = { name: name, image: image };
      dispatch(createBrand(obj));
      setTimeout(()=>{dispatch(getBrands())},2000)
    }
    setName("");
    setImage("");
    setimageData("")
  }

  return (
    <div>
      <form
        type="POST"
        className={styles.formContainerBrand}
        onSubmit={onSubmit}
      >
        <div className={styles.formFirstDivBrand}>
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
        {!errorName ? null : <span className={styles.danger}>{errorName}</span>}
        
        <label>Imagen a:</label>
            <div className={styles.formImageBrand}>
              <input
                type="file"
                onChange={(e) => updateImage(e)}
                className="formInput"
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
            </div></div>
        {brand ? <button
          name="submit"
          className={styles.button}
          type="submit"
          disabled={!image || !name || errorName ? true : false}
        >
          Modificar Marca
        </button> : <button
          name="submit"
          className={styles.button}
          type="submit"
          disabled={!image || !name || errorName ? true : false}
        >
          Crear Marca
        </button>}
      </form>{" "}
    </div>
  );
}
