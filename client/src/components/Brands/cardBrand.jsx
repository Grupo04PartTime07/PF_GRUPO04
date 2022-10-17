import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './cardBrand.css'

export default function ImgMediaCard(props) {

    return (
        <Card
            className='brandCard'
            sx={{ width: 545}}
        >
            <CardMedia
                className='brandImg'
                component="img"
                alt={props.name}
                sx={{ maxWidth: 250 }}
                
                image={props.image}
            />
            <CardContent>
                <Typography className="brandName" gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
}
