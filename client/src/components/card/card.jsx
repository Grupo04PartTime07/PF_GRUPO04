import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { useDispatch } from 'react-redux';
import { addToFavorite } from '../../redux/actions/add_to_favorite';

export default function ImgMediaCard(props) {

  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image={props.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${props.price}
        </Typography>
      </CardContent>
      <CardActions>

        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={()=> dispatch(addToFavorite({name: props.name, image: props.image, price: props.price})) }
        >
            <FavoriteTwoToneIcon />
        </IconButton>

        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <AddShoppingCartTwoToneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
