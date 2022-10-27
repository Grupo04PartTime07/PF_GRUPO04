import * as React from "react";
import styles from "./brandForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrand } from "../../redux/actions/create_brand";
//import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import { Image } from "cloudinary-react";
//import { useEffect} from "react";

export default function BrandForm() {
  //const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagen, setImagen] = useState(""); //este estado va a subir los datos a cloudinary
  const [imageData, setimageData] = useState(""); // este estado guardara las direcciones de cloudinary para pisar el input
  const [errorName, setErrorName] = useState("");
  const [errorImage, setErrorImage] = useState("");

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
    // setimageData({
    //   imageReel: imageData.filter((e) => e !== imageSurce),
    // });
    setimageData("")
  };


  function validateName(value) {
    if (!/^[a-zA-Z]+$/.test(value)) {
      // solo caracteres a-z minusculas y al menos uno
      setErrorName('Solo caracteres de la "a-z" y al menos uno');
    } else {
      setErrorName("");
    }
    setName(value);
  }

  function validateImage(value) {
    if (!/^(http[s]?)/.test(value)) {
      setErrorImage("La Url de la imagen debe comenzar con http");
    } else {
      setErrorImage("");
    }
    setImage(value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const obj = { name: name, image: image };
    //console.log(obj)
    dispatch(createBrand(obj));
    setName("");
    setImage("");
  }

  /*  async function callProtectedApiToken2() {
        try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
            "http://localhost:3001/users",
            {
            name: user.name || " ",
            email: user.email,
            },
            {
            headers: {
                authorization: `Bearer ${token}`,
            },
            }
        );
        user.isAdmin = response.data.userRegisted.isAdmin;
        user.isBanned = response.data.userRegisted.isAdmin;
        console.log(response.data);
        console.log(user);
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
        return () => {
            const usuario = callProtectedApiToken2();
            console.log(usuario);
        };
        }
    });
    */

  return (
    <div>
      {/* {isAuthenticated && user.isAdmin ?*/}
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

        {/* <label className={styles.imglabel}>Image: </label>
        <input
          className={errorImage ? styles.invalido : styles.valido}
          key="image"
          name="image"
          value={image}
          type="text"
          required
          onChange={(e) => validateImage(e.target.value)}
          autoComplete="off"
        />
        {!errorImage ? null : (
          <span className={styles.danger}>{errorImage}</span>
        )} */}
        
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
        <button
          name="submit"
          className={styles.button}
          type="submit"
          disabled={!image || errorImage || !name || errorName ? true : false}
        >
          Crear Marca
        </button>
      </form>{" "}
      {/*: <label>upss parece que no tienes permisos</label>}  */}
    </div>
  );
}
