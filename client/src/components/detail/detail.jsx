import React from "react";
import "./detail.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductDetails } from "../../redux/actions/get_product_details";
import { cleanProductState } from "../../redux/actions/clean_product_state";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import RelatedProducts from "./relatedProducts";
import ScoreForm from "./scoreForms";
import Loading from "../loading/loading";
import { addToCart } from "../../redux/actions/add_to_cart";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ModalReviews from "../modalReviews/modalReviews";

function Detail(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { id } = props.match.params;
  const dispatch = useDispatch();
  const [displayForm, setDisplay] = React.useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductDetails(id));
    return () => {
      dispatch(cleanProductState({}));
    };
  }, [dispatch, id]);

  function formDisplay() {
    setDisplay(!displayForm);
  }
  const[indice, setIndice] = useState(0)

  const detail = useSelector((state) => state.productdetail);
  let stars = [];
  for (let i = 0; i < Math.ceil(detail.score); i++) {
    stars.push(<StarRoundedIcon />);
  }

  return typeof detail.id === "number" ? (
    <div className="detailContainer">
        <div className="detailContainerArticles">
            <div>
            <div className="detailLeft">
          
                {/*Agregar una estiqueta de producto no disponible condicionada al stock*/}
                <h1 className="detailTitle">{detail.name}</h1>
                <span className="detailScore">{stars}</span>
                <h2 className="detailPrice"> $ {detail.price}</h2>
                <p className="detailDescription">{detail.description}</p>
            </div>
            <div className="detailButton">
            <Link to="/shoppingCart" style={{ textDecoration: "none" }}>
                <span className="buttonMargin">
                    <Button
                        onClick={() =>
                        dispatch(
                        addToCart({
                        id: detail.id,
                        name: detail.name,
                        image: detail.image,
                        price: detail.price,
                        quantity: 1,
                        })
                    )}
                        variant="contained">
                        Comprar
                    </Button>
                </span>
            </Link>
            <Button
                onClick={() =>
                    dispatch(
                        addToCart({
                        id: detail.id,
                        name: detail.name,
                        image: detail.image,
                        price: detail.price,
                        quantity: 1,
                        })
                    )}
                        variant="contained">
                        Agregar al Carrito
            </Button>
            </div>
            </div>
            <div className="detailImagen">
                <img src={detail.image[indice]} alt="productos" />
                <div>
                  {detail.image?.map((e,index) =>  {return(<img classname="imgMiniatura" src={e}  onClick={()=> setIndice(index)} alt="img"></img>)})} 
                </div>
            </div>
        </div>
    
        <div className="detailContainerOpinion detailMargin">
            <h1 className="opinionTitle">Opiniones</h1>
        <div className="opinionCard">
          <div className="opinionContainer">
            {detail.opiniones &&
              detail.opiniones.map((e) => {
                let starsOpinion = [];
                for (let i = 0; i < Math.ceil(e.score); i++) {
                  starsOpinion.push(<StarRoundedIcon />);
                }
                return (
                  <div>
                    <span>{starsOpinion}</span>
                    <p className="detailDescription">{e.coment}</p>
                  </div>
                );
              })}
          </div>
          {displayForm && <ScoreForm id={id} formDisplay={formDisplay} />}
        </div>
        <div classname="divBttnsOpinions ">
          
          <ModalReviews id={id}></ModalReviews><br/>
    
          {isAuthenticated && (
            <Button variant="contained" onClick={() => formDisplay()}>
              Dar tu Opinion
            </Button>
          )}
        </div>
      </div>
      <div>
        <RelatedProducts
          id={detail.id}
          categorie={detail.categories ? detail.categories[0] : null}
        />
      </div>
    </div>
  ) : (
    <Loading />
  );

}

export default Detail;
