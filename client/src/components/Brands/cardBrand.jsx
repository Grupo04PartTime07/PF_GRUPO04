import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './cardBrand.css'
import { useHistory } from 'react-router-dom';


export default function ImgMediaCard(props) {

    const history = useHistory();

    function handleClick(){
        history.push(`/brands?brand=${props.name}`, props.name)
    }

    return (
        <Card
            className='brandCard'
            sx={{ width: 545}}
            onClick={handleClick}
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
