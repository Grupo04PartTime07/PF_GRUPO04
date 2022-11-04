import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
//import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../redux/actions/add_to_favorite';
import { addToCart } from '../../redux/actions/add_to_cart';
import { Link } from 'react-router-dom';
import { pink } from '@mui/material/colors';
//import SvgIcon from '@mui/material/SvgIcon';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Rating from "@mui/material/Rating";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { styled } from "@mui/material/styles";

import './card.css'

export default function ImgMediaCard(props) {

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites)

  let itemFound = favorites.find(e => e.name === props.name)

  // let stars = []

  // for(let i = 1; i <= props.score; i++){
  //   stars.push(<StarRoundedIcon fontSize='small'/>)
  // }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#1976d2",
    },
    "& .MuiRating-iconHover": {
      color: "#154bbf",
    },
  });

  return (
    <Card 
      className='card' 
      sx={{ maxWidth: 245 }}       
    >
      <Link className='cardLink' to={`/products/${props.id}`} style={{textDecoration:"none", color: "black"}} >
      <CardMedia
        className='productImg'
        component="img"
        alt={props.name}
        sx={{ maxWidth: 170 }}
        height="170"
        image={props.image[0]}
      />
      <CardContent sx={{ height: 70 }} >
        <Typography sx={{ fontSize: 20 }} className="productPrice" gutterBottom variant="h5" component="div">
          ${props.price}
        </Typography>
        <Typography sx={{height: 36, overflow: 'hidden' }}>
        <Typography sx={{ fontSize: 12}} className="productName" variant="body2" color="text.secondary">
          {props.name}
        </Typography>
        </Typography>
        <Typography className="productStars" sx={{ display: 'flex'}} color="text.secondary">
          {/* {stars} */}
          {<StyledRating
                      defaultValue={props.score}
                      readOnly
                      icon={<StarRoundedIcon fontSize="inherit" />}
                      emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                      size="small"
                    />}
        </Typography>
      </CardContent>
      </Link>
      <CardActions>

        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={()=> dispatch(addToFavorite({id: props.id, name: props.name, image: props.image, price: props.price, score: props.score, stock: props.stock, quantity:1 })) }
        >
        {/* { itemFound? <FavoriteTwoToneIcon /> : <FavoriteBorderOutlinedIcon/> } */}
        { itemFound? <FavoriteRoundedIcon sx={{ color: pink[500] }}/> : <FavoriteBorderOutlinedIcon /> }
        </IconButton>

        <IconButton size="large" aria-label="show 4 new mails" color="inherit"
        onClick={()=> dispatch(addToCart({id: props.id, name: props.name, image: props.image, stock: props.stock, price: props.price, quantity: 1})) }>
            <AddShoppingCartTwoToneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}