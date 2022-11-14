import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './categories.css'
import { getCategories } from "../../../redux/actions/get_categories";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import CategoryForm from "../../categoryForm/categoryForm";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

import swal from 'sweetalert';

import EnhancedTable from "./results";

const Search = styled('div')(({ theme }) => ({
    position: 'relative', 
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

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

    function handleEnter(){
        setSearchQuery("")
    }

    function cleanCurrent (){
      setSearchQuery("");
      setCategory({});
    }

    const dataFiltered = filterData(searchQuery, categories);

    return(
        <div>
        <div className="forthasearching">
            <div className='forthasearchcontainer'>
                <div className='tharealcontainer4brand'>           
                    <div className="div4search">
                        <Search className='input' sx={{ position: 'relative', left: '-10px', maxWidth: '40%', border: '1.5px solid rgb(225, 225, 225)' }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color: 'rgb(110, 110, 110)'}}/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            value= {searchQuery}
                            sx={{ display: 'flex'}}
                            placeholder="Busca una categoría…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) =>{if(e.key === 'Enter'){handleEnter()}}}
                        />
                        </Search>
                    </div>

                    {dataFiltered && dataFiltered.length? <EnhancedTable rows={dataFiltered} displayProductForm={displayProductForm} setSearchQuery={setSearchQuery}></EnhancedTable>:null}           
                    
                </div>
                {currentCategory && display == currentCategory.id ? <div><CategoryForm category={currentCategory} setDisplay={setDisplay} cleanCurrent={cleanCurrent} /></div> : null}
            </div>
        </div>
        </div>
    )
}