import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import BrandForm from "../brandForm/brandForm";
import CreateProduct from "../createProduct/CreateProduct";
import CategoryForm from "../categoryForm/categoryForm";
import UpdateInventory from "../stock/inventory";
import AllBrands from "./brands/brands"
import AllCategories from './categories/categories'
import './adminProducts.css'

export default function AdminProducts(){
    const [componentview, setComponent] = useState("search")
    const [displayMore, setDisplayM] = useState(false)
    
    function handleComponent(e){
        if(e.target.name === "products" || e.target.name === "brands" || e.target.name === "categories") setDisplayM(false);
        setComponent(e.target.name)
    }

    function handleExtra (){
        setDisplayM(true)
    }

    return(
        <div className="container">
            <div className="buttoncont">
                <Tooltip title="Busca tus productos y modifica su información" placement="top-start">
                    <button name="products" className={componentview === "products"? "currentbtn": "searchbtn" } onClick={(e) => handleComponent(e)}>Productos</button>
                </Tooltip>
                <Tooltip title="Busca tus marcas y modifica su información" placement="top-start">
                    <button name="brands" className={componentview === "brands"? "currentbtn": "searchbtn" } onClick={(e) => handleComponent(e)}>Marcas</button>
                </Tooltip>
                <Tooltip title="Busca tus categorías y modifica su información" placement="top-start">
                    <button name="categories" className={componentview === "categories"? "currentbtn": "searchbtn" } onClick={(e) => handleComponent(e)}>Categorías</button>
                </Tooltip>
                <Tooltip title="Agrega nuevos elementos al Catálogo" placement="top-start">
                    <button name="create" className={componentview === "brand" || componentview === "category" || componentview === "product" ? "currentbtn": "searchbtn" } onClick={() => handleExtra()}>Crear</button>
                </Tooltip>
            </div>
            <div className="morebuttoncont">
                {displayMore && <button name="brand" className={componentview === "brand"? "currentbtn": "searchbtn"}  onClick={(e) => handleComponent(e)}>Marca</button>}
                {displayMore && <button name="category" className={componentview === "category"? "currentbtn": "searchbtn"}  onClick={(e) => handleComponent(e)}>Categoría</button>}
                {displayMore && <button name="product" className={componentview === "product"? "currentbtn": "searchbtn"}  onClick={(e) => handleComponent(e)}>Producto</button>}
            </div>
            {componentview === "products" ? <UpdateInventory/> : null}
            {componentview === "brands" ? <AllBrands/>:null}
            {componentview === "categories" ? <AllCategories/> :null}
            {componentview === "product" ? <CreateProduct/>:null}
            {componentview === "brand" ? <BrandForm/>:null}
            {componentview === "category" ? <CategoryForm/>:null}
        </div>
    )
}