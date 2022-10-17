import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



export default function ImgMediaCard(props) {


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
                    {props.name}
                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
}
