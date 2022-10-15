import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './categoriesList.css'

function BasicCard(props) {
  return (
    <Card className='categorie_card' sx={{ bgcolor: 'info.main'}}>
      <CardContent>
        <Typography className='categorie' variant="h5" component="div">
          {props.categorie}
        </Typography>
      </CardContent>
    </Card>
  );
}

const categoriesList = [
    'Aceites y Vinagres',
    'Agua',
    'Almacén',
    'Bebidas',
    'Cuidado Personal',
    'Desayuno y Merienda',
    'Especias',
    'Golosinas',
    'Harinas',
    'Lácteos',
    'Licores',
    'Limpieza',
    'Mascotas',
    'Pastas Secas', 
    'Perfumeria',
    'Reposteria',
    'Salsas',
    'Secos',
]

export default function CategoriesList(){
    return(
        <div className='table'>
            {categoriesList.map(cat => <BasicCard categorie={cat}/>)}
        </div>
    )
}