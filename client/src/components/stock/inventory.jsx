import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './inventory.css'
import { getNameProduct } from '../../redux/actions/search_name';
import { updateInventory } from "../../redux/actions/update_inventory";
import { cleanProductState } from "../../redux/actions/clean_product_state";
import { getProductDetails } from "../../redux/actions/get_product_details";
import { cleanProducts } from "../../redux/actions/clean_products";

export default function UpdateInventory(){
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const productdetail = useSelector((state) => state.productdetail)
    const [search, setSearch] = useState("")
    const [input, setInventory] = useState({id: "", stock: ""})
    const [display, setDisplay] = useState("")

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function handleInputChange(e){
        setInventory({ id: e.target.name, stock: e.target.value})
    }

    function searchSubmit(e){
        e.preventDefault()
        dispatch(cleanProductState())
        dispatch(getNameProduct(search))
        setSearch("")
    }

    function displayInventoryForm(e){
        setDisplay(e.target.name)
    }

    function handleSubmitInventory(){
        dispatch(updateInventory(input.id, {newStock: input.stock}))
        dispatch(cleanProducts())
        alert("Producto actualizado con exito")
        dispatch(getProductDetails(input.id))
        setInventory({id: "", stock: ""})
        setDisplay("")
    }

    return(
        <div className="container">
            <form className="search" onSubmit={(e) => searchSubmit(e)}>
                <p className="searchlabel">Busqueda de Producto:</p>
                <input type="text" className="searchinput" value={search} onChange={(e) => handleSearchChange(e)}/>
                <input type="submit" className="searchbtn" value="&#8594;"/>
            </form>
            <div className="resultcontainer">
                { products && products.length ?
                    products.map(p => {
                        return(
                            <div className="itemscontainer">
                                <img src={p.image} width={"30px"} height={"35px"} />
                                <label>{p.name}</label>
                                <label>{p.stock}</label>
                                <button name={p.id} className="searchbtn" onClick={(e) => displayInventoryForm(e)}>&#8594;</button>
                                {display && display == p.id ? <input type="number" className="stockinput" min="0" max="1000" value={input.stock} name={p.id} onChange={(e)=>handleInputChange(e)}/> : null }
                                {display && display == p.id ? <button className="searchbtn" onClick={handleSubmitInventory}>Guardar</button>: null }
                            </div>
                        )
                    }): null
                }
                { productdetail && productdetail.name ? 
                <div>
                    <img src={productdetail.image} width={"30px"} height={"35px"} />
                    <label>{productdetail.name}</label>
                    <label>{productdetail.stock}</label>
                </div>
                : null }
            </div>
        </div>
    )
}