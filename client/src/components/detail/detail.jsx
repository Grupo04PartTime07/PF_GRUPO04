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
import { getUserHistory } from "../../redux/actions/get_user_history";
import { addToCart } from "../../redux/actions/add_to_cart";
import { addToFavorite } from "../../redux/actions/add_to_favorite";
import { useAuth0 } from "@auth0/auth0-react";
import ModalReviews from "../modalReviews/modalReviews";
import ModalImg from "./modalImg";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import Rating from "@mui/material/Rating";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { styled } from "@mui/material/styles";
import { grey } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import IconButton from '@mui/material/IconButton';
import OpinionCard from "./auxDetail/opinionCard";
import { getUserDetails } from '../../redux/actions/get_user_details';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


function Detail(props) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useHistory()
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const [displayForm, setDisplay] = React.useState(false);
  const detail = useSelector((state) => state.productdetail);
  const scoreProm = useSelector((state) => state.score_prom);
  const favorites = useSelector(state => state.favorites);
  const userHistory = useSelector(state => state.userHistory);
  const profile = useSelector(state => state.userDetail )

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductDetails(id));
    
    return () => {
      dispatch(cleanProductState({}));
    };
  }, [dispatch, id, scoreProm]);

  useEffect(() => {
    if(isAuthenticated) dispatch(getUserHistory(user.email))
  }, [dispatch, user])

  useEffect(() => {
    if (isAuthenticated){
      dispatch(getUserDetails(user.email))    
      };
    },[isAuthenticated])

  function formDisplay() {
    setDisplay(!displayForm);
  }
  const [indice, setIndice] = useState(0);

  const cart = useSelector((state) => state.cart)
  // let stars = [];
  // for (let i = 0; i < Math.ceil(detail.score); i++) {
  //   stars.push(<StarRoundedIcon />);
  // }

  let productHistory = userHistory.includes(detail.id)
  let itemFound = favorites.find(e => e.name === detail.name)
  
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#1976d2",
    },
    "& .MuiRating-iconHover": {
      color: "#154bbf",
    },
  });

  const handleComprar = () =>{
    dispatch(
      addToCart({
        id: detail.id,
        name: detail.name,
        image: detail.image,
        price: detail.price,
        stock: detail.stock, 
        quantity: 1,
      }))
      history.push('/shoppingCart')
  }

  return typeof detail.id === "number" ? (
    <div className="detailContainer">
      <div className='volverDetail' onClick={() => history.goBack()}><IconButton sx={{ padding: 0 }} ><ArrowLeftRoundedIcon sx={{ color: grey[50]}}/></IconButton> Volver</div>
      <div className="detailContainerArticles">
        <div>
          <div className="detailLeft">
            {/*Agregar una estiqueta de producto no disponible condicionada al stock*/}
            <h1 className="detailTitle">{detail.name}</h1>
            {/* <span className="detailScore">{stars}</span> */}
            <StyledRating
              defaultValue={detail.score}
              precision={0.5}
              readOnly
              icon={<StarRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
              sx={{ margin: "15px" }}
            />
            <h2 className="detailPrice">
              {" "}
              $ {detail.price}{" "}
              {detail.stock < 10 ? (
                <label className="pocostock">{`(${detail.stock} unidades disponibles!!!)`}</label>
              ) : detail.stock !== 0 ? (
                <label className="stoocks">
                  {`(${detail.stock} unidades disponibles)`}{" "}
                </label>
              ) : (
                <label className="waarning">(Producto no disponible)</label>
              )}
            </h2>
            <p className="detailDescription">{detail.description}</p>
          </div>
          {isAuthenticated && user.isAdmin === true ? null : <div className="detailButton">
              <span className="buttonMargin">
                {detail.stock < 1 ? <Button
                  variant="contained"
                  disable= {true}
                >
                  No disponible
                </Button> : <Button
                  onClick={isAuthenticated ? () =>handleComprar() : loginWithRedirect}
                  variant="contained"
                >
                  Comprar
                </Button>}
              </span>
            {detail.stock<1 ? null : <span className="buttonMargin">
              <Button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: detail.id,
                      name: detail.name,
                      image: detail.image,
                      price: detail.price,
                      stock: detail.stock, 
                      quantity: 1,
                    })
                  )
                }
                variant="contained"
              >
                <AddTwoToneIcon /> Carrito
              </Button>
            </span>}
            <Button
              sx={{
                    minWidth: 130,
                 }}
              onClick={() =>
                dispatch(
                  addToFavorite({
                    id: detail.id,
                    name: detail.name,
                    image: detail.image,
                    price: detail.price,
                    score: detail.score,
                    stock: detail.stock, 
                    quantity: 1,
                  })
                )
              }
              variant="contained"
            >
             {itemFound ? <RemoveTwoToneIcon/> : <AddTwoToneIcon />} Favoritos
            </Button>
          </div>}
          {isAuthenticated && user.isAdmin === true ? null : <div className="detailButton visibilidad">
              <span className="buttonMargin">
                {detail.stock < 1 ? <Button
                  variant="contained"
                  disable= {true}
                >
                  No disponible
                </Button> : <Button
                  onClick={isAuthenticated ? () =>handleComprar() : loginWithRedirect}
                  variant="contained"
                >
                  <ShoppingCartOutlinedIcon/>
                </Button>}
              </span>
            {detail.stock<1 ? null : <span className="buttonMargin">
              <Button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: detail.id,
                      name: detail.name,
                      image: detail.image,
                      price: detail.price,
                      stock: detail.stock, 
                      quantity: 1,
                    })
                  )
                }
                variant="contained"
              >
                <AddShoppingCartTwoToneIcon />
              </Button>
            </span>}
            <Button
              sx={{
                    minWidth: 80,
                 }}
              onClick={() =>
                dispatch(
                  addToFavorite({
                    id: detail.id,
                    name: detail.name,
                    image: detail.image,
                    price: detail.price,
                    score: detail.score,
                    stock: detail.stock, 
                    quantity: 1,
                  })
                )
              }
              variant="contained"
            >
             {itemFound ? <RemoveTwoToneIcon/> : <AddTwoToneIcon />} 
             <FavoriteBorderOutlinedIcon/>
            </Button>
          </div>}
         </div>
        <div className="detailImagen">
          <ModalImg img={detail.image[indice]} />
          <div className="ContainerMiniaturas">
            {detail.image?.map((e, index) => {
              return (
                <img
                  className="imgMiniatura"
                  src={e}
                  onClick={() => setIndice(index)}
                  alt="img"
                ></img>
              );
            })}
          </div>
        </div>
      </div>
      <div className="detailContainerOpinion detailMargin">
        <h1 className="opinionTitle">Opiniones</h1>
        <ModalReviews id={id}></ModalReviews><br/>
        <div className="opinionCard">
          <OpinionCard detail={detail}></OpinionCard>
        </div>
        

            <div className="divFormOpinions">
              {displayForm && <ScoreForm id={id} formDisplay={formDisplay}/>}
            </div>
            <div className="divBttnsOpinions">
              {isAuthenticated && user.isAdmin === false && productHistory ? (
                <Button variant="contained" onClick={() => formDisplay()}>
                  Deja un comentario
                </Button>
              ):null}
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
