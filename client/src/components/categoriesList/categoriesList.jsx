import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/get_categories';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import {cleanProducts} from '../../redux/actions/clean_products'
import './categoriesList.css'
import Loading from '../loading/loading';

function BasicCard(props) {
  
  const history = useHistory()
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(cleanProducts({}));
    history.push(`/products?category=${props.name}`, props.name);
    
  }
  
  return (
    
      <Card className='categorie_card' sx={{ bgcolor: 'info.main'}} onClick={handleClick}>
        <CardMedia 
          className='categoryIcon'
          component="img"
          sx={{ width: 150 }}
          height="150"
          image={props.image}
          alt={props.name}
        />
        <CardContent>
          <Typography className='categorie' variant="h5" component="div">
            {props.name}
          </Typography>
        </CardContent>
      </Card>

  );
}

export default function CategoriesList(){
  const categoriesList = useSelector(state => state.categories) 
  const dispatch = useDispatch()
  console.log(categoriesList)
  React.useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(getCategories())
    }, [dispatch]
  )

  return(
      categoriesList.length > 0 ? <div>
        <div className='table'>
          {categoriesList.map(cat => <BasicCard image={cat.image} name={cat.name}/>)}
        </div>
      </div> : <Loading/>
  )
}