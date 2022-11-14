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
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getNameProduct } from "../../redux/actions/search_name";
import ShoppingBar from '../ShoppingCartBar/ShoppingBar';
import { fulfillCart } from "../../redux/actions/fulfill_cart";
import { fulfillWishList } from "../../redux/actions/fulfill_wish_list";
import { getUserDetails } from '../../redux/actions/get_user_details';
import { getUserDetailToken } from '../../redux/actions/get_user_detail_token';
import './navbar.css'
import {useAuth0} from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import {useEffect} from 'react';
import { getScoreUserId } from '../../redux/actions/get_score_user_id';
import {getAllUsers} from '../../redux/actions/get_all_users';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import Tooltip from '@mui/material/Tooltip';
const { BACK_URL = 'http://localhost:3001' } = process.env



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
  const history = useHistory()
  const [name, setName] = React.useState('');
  const [viewcart, setCart] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector(state => state.favorites)
  let currentUser = "Guest"
  if(user && user.email) currentUser = user.email
  let dhacart = JSON.parse(window.localStorage.getItem(`c${currentUser}`))
  let dhafav = JSON.parse(window.localStorage.getItem(`f${currentUser}`))
  let localStorageEmail = window.localStorage.getItem("userEmail")
 
  const profile = useSelector(state => state.userDetail )
  const score = useSelector(state =>state.scoreUserId)
  console.log('SOY SCORE',score)
  console.log('USER', user)
  console.log('AUTETIC', isAuthenticated);


  useEffect(() => {
    dispatch(getAllUsers());
  },[]);
       
   
  useEffect(() => {console.log('ENTRO', score)
  if (isAuthenticated){
    dispatch(getUserDetails(user.email))    
    dispatch(getScoreUserId(user.email))};

  },[isAuthenticated, localStorageEmail])
  
  

  React.useEffect(()=>{
    if(dhacart && dhacart.length){
      if(user){
        let cguest = JSON.parse(window.localStorage.getItem('cGuest'))
        updateStorage('cGuest', [])
        var nvocart = []
        //var respuesta = cguest[0] ? console.log(cguest[0].id, "soy cguest"):"no se en que estoy pensando"
        // console.log(respuesta)
        // console.log(dhacart[0], "soy dhacart") // carrito en local
        
        for (let i = 0; i < cguest.length; i++) {
          var flag = 0
          for (let j = 0; j < dhacart.length; j++) {
              if(cguest[i].id == dhacart[j].id){
                  dhacart[j].quantity = dhacart[j].quantity + cguest[i].quantity;
                  dhacart[j].price = dhacart[j].price + cguest[i].price;
                  flag = 1
                }
          }
            if(flag !== 1 ){
              dhacart.concat(cguest[i])
            } 
        
        }
        nvocart = dhacart
        
        updateStorage(`c${currentUser}`, nvocart)
        updateStorage('cGuest', [])
        //dispatch(fulfillCart([]))
        dispatch(fulfillCart(nvocart))
      
      }else{
      
      //dispatch(fulfillCart([]))
      dispatch(fulfillCart(dhacart))
    }
  
  }else{
    let cguest = JSON.parse(window.localStorage.getItem('cGuest'));
    updateStorage(`c${currentUser}`, cguest)
    updateStorage('cGuest', []);
  }
  }, [dispatch, user])

    

  React.useEffect(()=>{ 
    if(dhafav && dhafav.length){
      dispatch(fulfillWishList([]))
      dispatch(fulfillWishList(dhafav))
    } 
    }, [dispatch, user])

  React.useEffect(() => {
      updateStorage(`c${currentUser}`, cart)
    }, [cart])
  
  React.useEffect(() => {
    updateWishList(`f${currentUser}`, favorites)
  }, [favorites])

  function updateStorage(user, cart){
      let updatedCart = JSON.stringify(cart);
      window.localStorage.setItem(user, updatedCart)
  }

  function updateWishList(user, fav){
    let updatedWishList = JSON.stringify(fav);
    window.localStorage.setItem(user, updatedWishList)
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
    history.push('/busqueda')
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

  const handleLogout = () => {
    window.localStorage.removeItem(`p${currentUser}`)
    logout()
  }

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
      {isAuthenticated && <MenuItem style={{ pointerEvents: 'none' }}><Avatar alt={profile.name} src={user.picture} /></MenuItem>}
      
      {isAuthenticated && <MenuItem style={{ pointerEvents: 'none' }}>¡Hola {profile.name}!</MenuItem>}

      {isAuthenticated &&
      <MenuItem onClick={handleMenuClose}>
      <Link className='link' to='/myProfile'>Mi perfil</Link>
      </MenuItem>
      }
      {/*  { Ver diseño, corresponde a cambios auth0}
      <MenuItem onClick={handleMenuClose}>Log in</MenuItem> 
      { Ver diseño, corresponde a cambios auth0} */}
      
      {/* Aca se hace el login */}
      {!isAuthenticated?<label className='link'><MenuItem id="1" onClick={loginWithRedirect }>Iniciar sesión</MenuItem></label>:<label className='link'><MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem></label>}
      
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
      {profile.isAdmin ? null : <> <MenuItem>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge >
              <LocalActivityOutlinedIcon/>
              {!isAuthenticated || profile.isAdmin ? <p className='PointNav'>Puntos</p>:<p className='PointNav'>{score} Puntos</p>}
              
              </Badge>
            </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cart.reduce(function ( acc, va){return (acc + va.quantity)},0)} color="error">
            <ShoppingCartTwoToneIcon />
          </Badge>
        </IconButton>
        <Link className="chartLink" to="/shoppingCart">
          <p className='link'>Carrito</p>
        </Link>
      </MenuItem>
      <MenuItem>
      
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={favorites.reduce(function ( acc, va){return (acc + va.quantity)},0)} color="error"> 
            <Link to="/wishList" style={{width: '30px', textDecoration:"none", color: "black"} }>
                <FavoriteTwoToneIcon />
            </Link>
            </Badge>  
        </IconButton>
        <Link className="chartLink" to="/wishList">
          <p className='link'>Favoritos</p>
        </Link>
      </MenuItem></>}

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
          <p className='link'>Iniciar sesión</p>
        </MenuItem>
      )}

      {isAuthenticated && (
        <MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link className='link' to='/myProfile'><p className='link'>Mi perfil</p></Link>
          </MenuItem>
          {!isAuthenticated ? 
            <MenuItem id="1" onClick={loginWithPopup }><p className='link'>Iniciar sesión</p></MenuItem>
            :
            <MenuItem onClick={logout}><p className='link'>Cerrar sesión</p></MenuItem>
          }
        </MenuItem>
      )}
    </Menu>
  );


  async function callProtectedApiToken() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        `${BACK_URL}/users`,
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
     
      window.localStorage.setItem(`userName`, user.name)
      window.localStorage.setItem(`userEmail`, user.email)
      window.localStorage.setItem(`isAdmin`, response.data.userRegisted.isAdmin)
      window.localStorage.setItem(`isBanned`, response.data.userRegisted.isBanned)
      
      } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    if (isAuthenticated) {
      // return () => {
      //   const usuario = callProtectedApiToken();
      //   // console.log(usuario);
      //   //localStorage.isAdmin=usuario.isAdmin;
      // };
      const token = getAccessTokenSilently();
      dispatch(getUserDetailToken(user.email, token));


    } else {
      window.localStorage.removeItem(`isAdmin`);
      window.localStorage.removeItem(`isBanned`);
      window.localStorage.removeItem(`userEmail`);
      window.localStorage.removeItem(`userName`);
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
          <Box sx={{flexGrow: 0.8}} />
            
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title="Acumula puntos con tus compras y canjealos por Descuentos" placement="top-start">
          <IconButton sx={profile.isAdmin ? {width: '40%', height: '50%', visibility:"hidden"} : {width: '40%', height: '50%'}} size="large" aria-label="show 4 new mails" color="inherit">
              <Badge >
              {!isAuthenticated || profile.isAdmin ?<LocalActivityOutlinedIcon/>:<p className='greetingsPoint'>{score} Pts.</p>}
              
              </Badge>
            </IconButton>
            </Tooltip>
            <Tooltip title="Dale un vistazo al carrito de compras" placement="top-start">
            <IconButton sx={profile.isAdmin ? {width: '40%', height: '50%', visibility:"hidden"} : {width: '40%', height: '50%'}} onClick={handleDisplayCart} size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cart.reduce(function ( acc, va){return (acc + va.quantity)},0)} color="error">
                <ShoppingCartTwoToneIcon />
              </Badge>
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Accede a tus Favoritos" placement="top-start">
            <IconButton 
              sx={profile.isAdmin ? {width: '40%', height: '50%', visibility:"hidden"} :{width: '40%', height: '50%'}}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge sx={{width: '27px', height: '27px'}} badgeContent={favorites.reduce(function ( acc, va){return (acc + va.quantity)},0)} color="error">
                <Link to="/wishList" style={{width: '30px', textDecoration:"none", color: "whitesmoke"} }>
                <FavoriteTwoToneIcon />
                </Link>
              </Badge>
            </IconButton>
            </Tooltip>
            <IconButton
              sx={{width: '40%', height: '55px'}}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {isAuthenticated ? <div className='avatar' >
                {isAuthenticated?<Avatar alt={user.name} src={user.picture} sx={{width: '30px', height: '30px'}}/>:<AccountCircleTwoToneIcon sx={{width: '30px', height: '30px'}} />}
                {isAuthenticated && <p className='greetingsUser'>{profile.name}</p>}
              </div> : 
              <div>
                {<AccountCircleTwoToneIcon />}
              </div>}
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