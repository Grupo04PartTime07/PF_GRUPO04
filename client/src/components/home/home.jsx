import React,{useEffect} from "react";
import Card from '../card/card'
import { useDispatch, useSelector } from 'react-redux';
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
          block: 'center',
        });
      }
    };
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
    
    useEffect(() => {  // Didmount and DidUpdate controlled
        dispatch(getAllProducts());
    },[dispatch]) 

    return(
        products[0] && products[0].price ? <div>
            <Toolbar id="back-to-top-anchor" />
            <div><Banner/></div>
            <h2 className="categorieTitle">Todos los productos</h2>
            <div className="homeTable"> {/*#AgregameUnaEstrella*/}
                { products.map(a => a.stock === 0 ? null : <Card id={a.id} name={a.name} image={a.image} price={a.price} score={a.score}/>) }
            </div>
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div> : <Loading/>
    )
}