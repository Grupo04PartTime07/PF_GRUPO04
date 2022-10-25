import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './inventory.css'
import { searchForInventory } from '../../redux/actions/search_4_inventory'
import { updateInventory } from "../../redux/actions/update_inventory";
import { cleanProductState } from "../../redux/actions/clean_product_state";
import { getProductDetails } from "../../redux/actions/get_product_details";
import { cleanInvProducts } from "../../redux/actions/clean_inv_products";

export default function UpdateInventory(){
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsinv);
    const productdetail = useSelector((state) => state.productdetail)
    const [search, setSearch] = useState("")
    const [input, setInventory] = useState({id: "", stock: ""})
    const [display, setDisplay] = useState("")

    useEffect(() => {
        return () => {
          dispatch(cleanProductState({}));
          dispatch(cleanInvProducts())
        };
      }, [dispatch]);

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function handleInputChange(e){
        setInventory({ id: e.target.name, stock: e.target.value})
    }

    function searchSubmit(e){
        e.preventDefault()
        dispatch(cleanProductState())
        dispatch(searchForInventory(search))
        setSearch("")
    }

    function displayInventoryForm(e){
        setDisplay(e.target.name)
    }

    function handleSubmitInventory(){
        dispatch(updateInventory(input.id, {newStock: input.stock}))
        dispatch(cleanInvProducts())
        alert("Producto actualizado con exito")
        dispatch(getProductDetails(input.id))
        setInventory({id: "", stock: ""})
        setDisplay("")
    }

    return(
        <div className="container">
            <form className="search" onSubmit={(e) => searchSubmit(e)}>
                <p className="searchlabel">Busca un producto para modificar su Inventario:</p>
                <input type="text" className="searchinput" value={search} onChange={(e) => handleSearchChange(e)}/>
                <input type="submit" className="searchbtn" value="&#8594;"/>
            </form>
            <div className="resultcontainer">
                { products && products.length ?
                    <div className="itemscontainer">
                    <label className="labelheader">  </label>
                    <label className="labelheader">Producto  </label>
                    <label className="labelheader">Cant.  </label>
                    <label>  </label>
                    <label>  </label>
                    <label>  </label>
                </div> : null}
                { products && products.length ?
                    products.map(p => {
                        return(
                            <div className="itemscontainer">
                                <img src={p.image} width={"30px"} height={"35px"} />
                                <label className="itemlabel">{p.name}</label>
                                <label className="itemlabel">{p.stock}</label>
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