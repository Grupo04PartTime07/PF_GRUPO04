import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllProducts } from '../../redux/actions/get_products';
import Loading from "../loading/loading";
import './home.css'
import Banner from "./banner";
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Toolbar from '@mui/material/Toolbar';
import { cleanOtherProducts } from '../../redux/actions/clean_other_products'
import BestRatedProducts from "./AuxHome/bestRatedPRoducts";
import YourFavorites from "./AuxHome/yourFavorites";
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import IconButton from '@mui/material/IconButton';


function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          block: 'center', behavior: 'smooth'
        });
      }
    };
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16,  zIndex: 10 }}
        >
          {children}
        </Box>
      </Fade>
    );
}


ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};


export default function Home(props){

    const dispatch = useDispatch();
    const products = useSelector( state => state.products)
    const history = useHistory()
    let path = history.location.pathname

    useEffect(() => {  // Didmount and DidUpdate controlled
        window.scrollTo(0, 0)
        if(path === "/") dispatch(getAllProducts());    
        return(() => {
          dispatch(cleanOtherProducts())
      })
    },[dispatch])

    return(
        products[0] && products[0].price ? <div>
            {path === '/' ? <Toolbar id="back-to-top-anchor" /> : null}
            {path === '/' ? <div><Banner/></div> : <div className="volver" onClick={() => history.goBack()}><IconButton sx={{ padding: 0 }} ><ArrowLeftRoundedIcon /></IconButton> Volver</div>}
            <div>
              {path === '/' ? <YourFavorites/> : null}
              {path === '/' ? <BestRatedProducts/> : null}
              {path === '/' ? <h2 className="homeTitle">Todos los productos</h2> : <h2 className="homeTitle">Resultados de la Busqueda</h2>}
              <div className="homeTable"> {/*#AgregameUnaEstrella*/}
                  { products.map(a => a.stock === 0 ? null : <Card key={a.id} id={a.id} name={a.name} stock={a.stock} image={a.image} price={a.price} score={a.score}/>) }
              </div>
              {path === '/' ? <ScrollTop sx={{ zIndex: 10}} {...props}>
                  <Fab  size="small" aria-label="scroll back to top">
                      <KeyboardArrowUpIcon/>
                  </Fab>
              </ScrollTop> : null}
            </div>
        </div> : <Loading/>
    )
}