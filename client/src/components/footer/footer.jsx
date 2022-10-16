import React from "react";
import "./footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function footer() {
  return (
    <div className="footerContainer">
      <div>
        <h3>Mi Cuenta</h3>
        <ul className="footerList">
          <li>Perfil</li>
          <li>Favoritos</li>
          <li>Carrito</li>
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
                <li><TwitterIcon /></li>
                <li><FacebookIcon /></li>
                <li><YouTubeIcon /></li>
                <li><InstagramIcon /></li>
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
  );
}

export default footer;
