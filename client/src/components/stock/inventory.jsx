import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './inventory.css'
import { getAdminProducts } from '../../redux/actions/get_admin_products'
import { cleanInvProducts } from "../../redux/actions/clean_inv_products";
import SearchIcon from '@mui/icons-material/Search';
import CreateProduct from "../createProduct/CreateProduct";
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

    function handleEnter(){
      setSearchQuery("")
    }

    const dataFiltered = filterData(searchQuery, products);

    return(
        <div>
        <div className="forthasearching">
            <div className='forthasearchcontainer'>
                <div className='tharealcontainer'>
                  <div className="div4search">
                    <Search className='input' sx={{ position: 'relative', left: '-10px', maxWidth: '40%', border: '1.5px solid rgb(225, 225, 225)' }}>
                      <SearchIconWrapper>
                          <SearchIcon sx={{color: 'rgb(110, 110, 110)'}}/>
                      </SearchIconWrapper>
                      <StyledInputBase
                        value= {searchQuery}
                        sx={{ display: 'flex'}}
                        placeholder="Busca un producto…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) =>{if(e.key === 'Enter'){handleEnter()}}}
                      />
                    </Search>
                  </div>
                    {dataFiltered && dataFiltered.length ? <EnhancedTable rows={dataFiltered} displayProductForm={displayProductForm}></EnhancedTable>:null}           
                    
                </div>
                {currentProduct && display == currentProduct.id ? <div><CreateProduct product={currentProduct} setDisplay={setDisplay} cleanCurrent={cleanCurrent} ></CreateProduct></div> : null}
            </div>
        </div>
        </div>
    )
}