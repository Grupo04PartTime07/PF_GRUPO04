import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './categories.css'
import { getCategories } from "../../../redux/actions/get_categories";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import CategoryForm from "../../categoryForm/categoryForm";

import swal from 'sweetalert';

import EnhancedTable from "./results";


export default function AllCategories(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        return () => {

        };
      }, [dispatch]);

    const categories = useSelector((state) => state.categories);
    const [display, setDisplay] = useState("")
    const [currentCategory, setCategory] = useState({})
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
        setCategory(categories.find(b => b.id == e.target.id))
    }



    const dataFiltered = filterData(searchQuery, categories);

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
                            label="Busca una Categoria"
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
                {currentCategory && display == currentCategory.id ? <div><CategoryForm category={currentCategory} setDisplay={setDisplay} /></div> : null}
            </div>
        </div>
        </div>
    )
}