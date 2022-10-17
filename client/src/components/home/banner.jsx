import React from "react";
import './banner.css'

export default function Banner(){
    return(
        <div>
            <div className="slider">
                <ul>
                    <li><img className="promoImg" src="https://kiowobeautystore.com/wp-content/uploads/2019/07/BANNER-CATEGORIA-FARMSIN.jpg"/></li>
                    <li><img className="promoImg" src="https://static.helpjuice.com/helpjuice_production/uploads/upload/image/7553/direct/1654010126983-Ejemplo%20Atl%C3%A1ntico.jpg"/></li>
                    <li><img className="promoImg" src="https://irp-cdn.multiscreensite.com/6ecf3a93/MOBILE/png/1027619-supermercado-tio-juan-banner-min-min.png"/></li>
                </ul>
            </div>
        </div>
    )
}