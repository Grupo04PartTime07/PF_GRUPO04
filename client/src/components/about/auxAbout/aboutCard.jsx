import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function AboutCard(props) {

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={props.rolLetter === 'Fr' ? { bgcolor: red[500]} : props.rolLetter === 'Ba' ? { bgcolor: green[500]} : { bgcolor: blue[500]}} aria-label="recipe">
            {props.rolLetter}
          </Avatar>
        }
        title={props.name}
        subheader={props.rol}
      />
      <CardMedia
        component="img"
        height="294"
        image={props.image}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <IconButton aria-label="linkedIn">
        <a href={props.linkedIn}><LinkedInIcon sx={{color: 'gray'}}/></a>
        </IconButton>
      </CardActions>
    </Card>
  );
}
