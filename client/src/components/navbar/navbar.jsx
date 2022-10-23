import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MoreIcon from '@mui/icons-material/MoreVert';
import TemporaryDrawer from './menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getNameProduct } from "../../redux/actions/search_name";
import ShoppingBar from '../ShoppingCartBar/ShoppingBar';
import { fulfillCart } from "../../redux/actions/fulfill_cart";
import './navbar.css'
import {useAuth0} from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import {useEffect} from 'react';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative', 
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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

export default function PrimarySearchAppBar() {
  
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const [name, setName] = React.useState('');
  const [viewcart, setCart] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  let currentUser = "Guest"

  let dhacart = JSON.parse(window.localStorage.getItem(currentUser))
    React.useEffect(()=>{
        if(dhacart && dhacart.length) dispatch(fulfillCart(dhacart))
    }, [])
    React.useEffect(() => {
        updateStorage(currentUser, cart)
    }, [cart])
  
  function updateStorage(user, cart){
      let updatedCart = JSON.stringify(cart);
      window.localStorage.setItem(user, updatedCart)
  }
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
  };

  function handleSubmit (){
    dispatch(getNameProduct(name))
    setName('')   
  };

  function handleDisplayCart(){
    setCart(!viewcart)
  }


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      title={isAuthenticated?user.email:""}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated && <MenuItem style={{ pointerEvents: 'none' }}><Avatar alt={user.name} src={user.picture} /></MenuItem>}
      
      {isAuthenticated && <MenuItem style={{ pointerEvents: 'none' }}>{user.email}</MenuItem>}

      {isAuthenticated &&
      <MenuItem onClick={handleMenuClose}>
      <Link className='link' to='/createAccount' >Mis Datos</Link>
      </MenuItem>
      }
      {/*  { Ver diseño, corresponde a cambios auth0}
      <MenuItem onClick={handleMenuClose}>Log in</MenuItem> 
      { Ver diseño, corresponde a cambios auth0} */}
      
 
      {/* Aca se hace el login */}
      {!isAuthenticated?<MenuItem id="1" onClick={loginWithPopup }>Log in</MenuItem>:<MenuItem onClick={logout}>Log out</MenuItem>}
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <ShoppingCartTwoToneIcon />
          </Badge>
        </IconButton>
        <Link className="chartLink" to="/shoppingCart">
          <p>Carrito</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          {/* <Badge badgeContent={17} color="error"> */}
          <FavoriteTwoToneIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Favoritos</p>
      </MenuItem>

      {!isAuthenticated && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircleTwoToneIcon />
          </IconButton>

          {/* <p>Log In</p> */}
        </MenuItem>
      )}

      {isAuthenticated && (
        <MenuItem>
          {" "}
          <img
            src={user.picture}
            alt="Profile"
            className="nav-user-profile rounded-circle"
            width="50"
          />
        </MenuItem>
      )}
    </Menu>
  );


  async function callProtectedApiToken2() {
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

      //console.log(response.userRegisted);
      //console.log(response.message);
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
  


  return (
    <Box className='navBarBox' sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 10 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton> 
          <TemporaryDrawer/>
          </IconButton>
        
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'black'}}
          > 
            <Link to='/'><img src='https://assets.soyhenry.com/logos/ISOLOGO_HENRY_BLACK.png' alt='HenryLogo' width={70}/></Link>
            
          </Typography>
          <Search className='input' sx={{ minWidth: '30%' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value= {name}
              sx={{ display: 'flex'}}
              placeholder="Busca un producto…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) =>{if(e.key === 'Enter'){handleSubmit()}}}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={handleDisplayCart} size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cart.reduce(function ( acc, va){return (acc + va.quantity)},0)} color="error">
                <ShoppingCartTwoToneIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <FavoriteTwoToneIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             {isAuthenticated?<Avatar alt={user.name} src={user.picture} />:<AccountCircleTwoToneIcon />}
              
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {viewcart && <ShoppingBar handleDisplayCart={handleDisplayCart}/>}
    </Box>
  );
}
