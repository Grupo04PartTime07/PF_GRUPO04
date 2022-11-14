import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './menu.css'
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import {useEffect} from 'react';

const { BACK_URL = 'http://localhost:3001' } = process.env

export default function TemporaryDrawer() {
  
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <img className='henryLogoMenu' src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png' alt='HenryLogo'></img>
      <List>
        {['Inicio', 'Categorías', 'Marcas'].map((text, index) => (
            <Link className='link' to={index !== 0 ? '/' + text : '/'}> 
                <ListItemButton>
                    <ListItem key={text} disablePadding>
                        <ListItemIcon>
                            {index === 0 ? <HomeTwoToneIcon/> : index % 2 === 0 ? <LoyaltyTwoToneIcon /> : <CategoryTwoToneIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} /> 
                    </ListItem>
                </ListItemButton> 
            </Link>
        ))}
      </List>
      <Divider />

      {<List>
      
        {["El equipo"].map((text, index) => ( //corregir la ruta de destino
          <Link className='link' to={`/about`}>
          <ListItemButton>
            <ListItem key={text} disablePadding>
            
              <ListItemIcon>
                {index === 0 ? <GroupsTwoToneIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </ListItemButton>
          </Link>
        ))}
      </List>}
    </Box>
  );

  async function callProtectedApiToken2(){
    try{
  
      const token = await getAccessTokenSilently();
      const response = await axios.post(`${BACK_URL}/users` , {
        name: user.name || " " , email: user.email
       
      
      },{  headers:{
        authorization:`Bearer ${token}`,
      }});
      user.isAdmin = response.data.userRegisted.isAdmin;
      user.isBanned = response.data.userRegisted.isAdmin;
      
    }catch(error) {
      console.log(error);
    }
  }
  
     useEffect(() => {
  
          if (isAuthenticated){
  
          return () => {
              const usuario = callProtectedApiToken2();
          }
        }})
  




  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            
          <MenuIcon className='menuIcon' sx={{ width: 30, position: 'relative', top: '2px'}} onClick={toggleDrawer(anchor, true)}/>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
