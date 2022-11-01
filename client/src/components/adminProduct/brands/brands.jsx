import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './brands.css'
import { getBrands } from "../../../redux/actions/get_brands"
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import BrandForm from "../../brandForm/brandForm";

import swal from 'sweetalert';

import EnhancedTable from "./results";


export default function AllBrands(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands())
        return () => {

        };
      }, [dispatch]);

    const brands = useSelector((state) => state.brand);
    const [display, setDisplay] = useState("")
    const [currentBrand, setBrand] = useState({})
    const [searchQuery, setSearchQuery] = useState("");

    const filterData = (query, data) => {
        if (!query) {
          return data;
        } else {
          return data.filter((d) => d.name.toLowerCase().includes(query));
        }
      };

    function displayProductForm(e){
        setDisplay(e.target.id)
        setBrand(brands.find(b => b.id == e.target.id))
    }



    const dataFiltered = filterData(searchQuery, brands);

    return(
        <div>
        <div className="forthasearching">
            <div className='forthasearchcontainer'>
                <div className='tharealcontainer4brand'>           
                    <form className="search4brand">
                        <TextField
                            id="search-bar"
                            className="text"
                            onInput={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            label="Busca una Marca"
                            variant="outlined"
                            placeholder="Busca..."
                            size="small"
                        />
                        <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                        </IconButton>
                    </form>

                    {dataFiltered && dataFiltered.length? <EnhancedTable rows={dataFiltered} displayProductForm={displayProductForm}></EnhancedTable>:null}           
                    
                </div>
                {currentBrand && display == currentBrand.id ? <div><BrandForm brand={currentBrand} setDisplay={setDisplay} /></div> : null}
            </div>
        </div>
        </div>
    )
}