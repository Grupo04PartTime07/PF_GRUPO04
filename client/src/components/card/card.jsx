import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../redux/actions/add_to_favorite';
import './card.css'

export default function ImgMediaCard(props) {

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites)

  let itemFound = favorites.find(e => e.name === props.name) 

  return (
    <Card 
      className='card' 
      sx={{ maxWidth: 245 }}       
    >
      <CardMedia
        className='productImg'
        component="img"
        alt={props.name}
        sx={{ maxWidth: 170 }}
        height="170"
        image={props.image}
      />
      <CardContent>
        <Typography className="productPrice" gutterBottom variant="h5" component="div">
          ${props.price}
        </Typography>
        <Typography className="productName" variant="body2" color="text.secondary">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>

        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={()=> dispatch(addToFavorite({name: props.name, image: props.image, price: props.price})) }
        >
        { itemFound? <FavoriteTwoToneIcon /> : <FavoriteBorderOutlinedIcon/> }
        </IconButton>

        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <AddShoppingCartTwoToneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
