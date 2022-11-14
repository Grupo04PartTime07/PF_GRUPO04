import React from "react";
import "./footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
import { getUserDetails } from '../../redux/actions/get_user_details';
import { useDispatch, useSelector } from 'react-redux';

function Footer() {
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const profile = useSelector(state => state.userDetail )
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuthenticated){
      dispatch(getUserDetails(user.email))    
      };
    },[isAuthenticated])

  return (
    <div className="footerContainer">
      <div className="container_text">
      <div>
        <h3>Mi Cuenta</h3>
        <ul className="footerList">
          {isAuthenticated ? <li><Link to='/myProfile'>Perfil</Link></li> : <li className="linkFooter" onClick={loginWithPopup}>Inicia sesión</li>}
          {isAuthenticated && profile.isAdmin ? null : <li><Link to='/wishList'>Favoritos</Link></li>}
          {isAuthenticated && profile.isAdmin ? null : isAuthenticated && <li><Link to='/shoppingCart'>Carrito</Link></li>}
        </ul>
      </div>

      <div className="footerContact">
        <h3>Contactanos</h3>
        <p>support@henrymarket.com</p>
        <p>Av. Cordoba 1940, CABA</p>
      </div>
      <div className="footerSocial">
        <h3>Redes Sociales</h3>
        <div className="footerSocialIcon">
            <ul>
                <li><a href="https://twitter.com/soyhenry_ok?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><TwitterIcon/></a></li>
                <li><a href="https://www.facebook.com/soyhenryok"><FacebookIcon/></a></li>
                <li><a href="https://www.youtube.com/channel/UCyPi0AHwcuCP-QJxrxq-f2Q"><YouTubeIcon/></a></li>
                <li><a href="https://www.instagram.com/soyhenry_ok/?hl=es"><InstagramIcon/></a></li>
            </ul>
        
        </div>
      </div>
      <div>
        <h3 className="footerLinkedinTitle">Trabaja con Nosotros</h3>
            <div className="footerLinkedin">
                <div className="footerLinkedinItem">
                    <ul>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/alejandro-morales-42b47123b"><h6>Alejandro Morales</h6></a></li>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/david-omar-olivera89/"><h6>David Olivera</h6></a></li>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/enzo-maidana-9810211a4/"><h6>Enzo Maidana</h6></a></li>
                        <li><LinkedInIcon/><a href="www.linkedin.com/in/gaston-frissiones-59ba4a253"><h6>Gaston Frissiones</h6></a></li>
                    </ul>
                </div>
                <div className="footerLinkedinItem">
                    <ul>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/rosim24/"><h6>Rosibel Mendoza</h6></a></li>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/react-front/"><h6>Luis Acosta</h6></a></li>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/juan-david-piedrahita-l%C3%B3pez-ab9b57b2/"><h6>Juan Lopez</h6></a></li>
                        <li><LinkedInIcon/><a href="https://www.linkedin.com/in/bernardo-broscheit-94b567144/"><h6>Bernardo Broscheit</h6></a></li>
                        
                    </ul>
                </div>
            </div>
      </div>
      </div>
    </div>
  );
}

export default Footer;
