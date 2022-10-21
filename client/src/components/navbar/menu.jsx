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
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './menu.css'

export default function TemporaryDrawer() {
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
      <List>
        {['Inicio', 'Categorias', 'Promociones', 'Marcas'].map((text, index) => (
            <Link className='link' to={index !== 0 ? '/' + text : '/'}> 
                <ListItemButton>
                    <ListItem key={text} disablePadding>
                        <ListItemIcon>
                            {index === 0 ? <HomeTwoToneIcon/> : index % 2 === 0 ? <PaidTwoToneIcon /> : <CategoryTwoToneIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} /> 
                    </ListItem>
                </ListItemButton> 
            </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Crear Articulo","Crear Categoria"].map((text, index) => ( //corregir la ruta de destino
          <Link className='link' to={index === 0 ? `/createProduct` : '/createCategory'}>
          <ListItemButton>
            <ListItem key={text} disablePadding>
            
              <ListItemIcon>
                {index % 2 === 0 ? <InventoryIcon /> : <LocalOfferIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            
          <MenuIcon onClick={toggleDrawer(anchor, true)}/>
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
