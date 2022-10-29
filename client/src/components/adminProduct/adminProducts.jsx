import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import BrandForm from "../brandForm/brandForm";
import CreateProduct from "../createProduct/CreateProduct";
import CategoryForm from "../categoryForm/categoryForm";
import UpdateInventory from "../stock/inventory";

export default function AdminProducts(){
    const [componentview, setComponent] = useState("search")
    
    function handleComponent(e){
        setComponent(e.target.name)
    }

    return(
        <div className="container">
            <div className="buttoncont">
                <Tooltip title="Busca tus productos y modifica su información" placement="top-start">
                    <button name="search" className="searchbtn" onClick={(e) => handleComponent(e)}>Buscar Productos</button>
                </Tooltip>
                <Tooltip title="Agrega una nueva Marca al Catálogo" placement="top-start">
                    <button name="brand" className="searchbtn" onClick={(e) => handleComponent(e)}>Nueva Marca</button>
                </Tooltip>
                <Tooltip title="Agrega una nueva Categoría al Catálogo" placement="top-start">
                    <button name="category" className="searchbtn" onClick={(e) => handleComponent(e)}>Nueva Categoría</button>
                </Tooltip>
                <Tooltip title="Crea un nuevo Producto de una de las Marcas del Catálogo" placement="top-start">
                    <button name="product" className="searchbtn" onClick={(e) => handleComponent(e)}>Nuevo Producto</button>
                </Tooltip>
            </div>
            {componentview === "search" ? <UpdateInventory></UpdateInventory> : null}
            {componentview === "brand" ? <BrandForm></BrandForm>:null}
            {componentview === "category" ? <CategoryForm></CategoryForm>:null}
            {componentview === "product" ? <CreateProduct></CreateProduct>:null}
        </div>
    )
}