import React from "react";
import Card from '../card/card'

export default function Home(){
    
    const array = [{
        "name": "Cereales Rellenos Frutilla Bocadito Granix Bolsa X 180 Gr",
        "price": 370,
        "image": ["https://http2.mlstatic.com/D_NQ_NP_664690-MLA47751429171_102021-O.webp%22,%22https://http2.mlstatic.com/D_NQ_NP_769317-MLA47381371718_092021-O.webp"],
        "description": "La mejor calidad en productos alimenticios y al mejor precio",
        "id": "34",
        "brand":"Granix",
        "categories": ["Almacén", "Golosinas"],
        "stock": 38,
        },
        {
        "name": "Nueces Mariposas Extra Light X 1kg",
        "price": 2990,
        "image": ["https://http2.mlstatic.com/D_NQ_NP_835091-MLA51814786657_102022-O.webp", "https://http2.mlstatic.com/D_NQ_NP_819025-MLA42736530385_072020-O.webp"],
        "description": "Nueces Mariposa Naturales",
        "id": "35",
        "brand":"Mundo Palta",
        "categories": ["Almacén", "Desayuno y Merienda"],
        "stock": 16,
        }]
    
    return(
        <div>
            {array && array.map(a => a.stock === 0 ? null : <Card name={a.name} image={a.image} price={a.price}/>)}
        </div>
    )
}