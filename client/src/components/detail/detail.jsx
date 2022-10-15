import React from "react";
import './detail.css';
import { Button } from "@mui/material";
// import {useDispatch, useSelector} from "react-redux";
// import {useEffect} from "react";
//import {getProductDetails, cleanProductState} from

function detail(props) {
  //const id = props.match.params.id;
  // const dispatch = useDispatch();
  // let detail = useSelector((state) => state.productsDetail)

  // useEffect(()=> {
  //     dispatch(getProductDetails(id));

  //     return(() => {
  //         dispatch(cleanProductState({}))
  //     })
  // }, [id])
  const id = "34"  
  let stars = {};
  const array = [
    {
      name: "Cereales Rellenos Frutilla Bocadito Granix Bolsa X 180 Gr",
      price: 370,
      image: [
        "https://http2.mlstatic.com/D_NQ_NP_664690-MLA47751429171_102021-O.webp%22,%22https://http2.mlstatic.com/D_NQ_NP_769317-MLA47381371718_092021-O.webp",
      ],
      description:
        "La mejor calidad en productos alimenticios y al mejor precio",
      id: "34",
      brand: "Granix",
      categories: ["Almacén", "Golosinas"],
      stock: 38,
      rating:3.4,
    },
  ];

  const opiniones = [
    {
        name: "Maria Marta",
        description:"ahora puedo ponerme al sol sin sufrir las consecuencias",
        rating: 3,
    },{
        name: "emanuel ortega",
        description:"la pagina esta bien",
        rating: 5, 
    },{
        name: "sanfilipo",
        description:"el producto me llego dañado",
        rating: 1,
    }
      ,
  ];

  

  return <div className="detailContainer">{array && 
            <div className="detailContainerArticles">
                    <div>
                        <h1 className="detailTitle">{array[0].name}</h1>
                        <span>{array[0].rating}</span>
                        <h2 className="detailPrice"> $ {array[0].price}</h2>
                        <p className="detailDescription">{array[0].description}</p>
                    <div className="detailButton">
                        <Button variant="contained">Comprar</Button>
                        <Button variant="contained">Agregar al Carrito</Button>
                    </div>
                </div>
                <div className="detailImagen"><img src={array[0].image} alt="productos" /></div>
            </div>}
            
            <div className="detailContainerOpinion detailMargin">
            <h1 className="opinionTitle">Opiniones</h1>
            <div className="opinionContainer">
            {opiniones && opiniones.map((e) => {
                return (
                <div >
                    <span>{e.rating}</span>
                    <p className="detailDescription">{e.description}</p>
                </div>)
            })}
            </div>  
            <Button variant="contained">Dar tu Opinion</Button>
        </div>
        
        </div>;
}

export default detail;
