import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './inventory.css'
import { getAdminProducts } from '../../redux/actions/get_admin_products'
import { cleanInvProducts } from "../../redux/actions/clean_inv_products";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import CreateProduct from "../createProduct/CreateProduct";

import swal from 'sweetalert';

import EnhancedTable from "./results";


export default function UpdateInventory(){
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsinv);
    const [display, setDisplay] = useState("")
    const [currentProduct, setProduct] = useState({})
    const [searchQuery, setSearchQuery] = useState("");   

    useEffect(() => {
        dispatch(getAdminProducts())
        return () => {
          dispatch(cleanInvProducts())
        };
      }, [dispatch]);

    const filterData = (query, data) => {
        if (!query) {
          return data;
        } else {
          return data.filter((d) => d.name.toLowerCase().includes(query));
        }
      };

    function displayProductForm(e){
        setDisplay(e.target.id)
        setProduct(products.find(p => p.id == e.target.id))
    }

    function cleanCurrent (){
        setProduct({})
    }
    console.log(currentProduct)
    console.log(display)

    const dataFiltered = filterData(searchQuery, products);

    return(
        <div>
        <div className="forthasearching">
            <div className='forthasearchcontainer'>
                <div className='tharealcontainer'>           
                    <form className="search4product">
                        <TextField
                                id="search-bar"
                                className="text"
                                onInput={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                                label="Busca un Producto"
                                variant="outlined"
                                placeholder="Busca..."
                                size="small"
                            />
                            <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                            </IconButton>
                    </form>
                    
                    {dataFiltered && dataFiltered.length ? <EnhancedTable rows={dataFiltered} displayProductForm={displayProductForm}></EnhancedTable>:null}           
                    
                </div>
                {currentProduct && display == currentProduct.id ? <div><CreateProduct product={currentProduct} setDisplay={setDisplay} cleanCurrent={cleanCurrent} ></CreateProduct></div> : null}
            </div>
        </div>
        </div>
    )
}