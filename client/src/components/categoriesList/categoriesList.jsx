import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/get_categories';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import './categoriesList.css'


function BasicCard(props) {
  return (
    <Card className='categorie_card' sx={{ bgcolor: 'info.main'}}>
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
      dispatch(getCategories())
    }, [dispatch]
  )

    return(
        <div className='table'>
          {categoriesList.map(cat => <BasicCard image={cat.image} name={cat.name}/>)}
        </div>
    )
}