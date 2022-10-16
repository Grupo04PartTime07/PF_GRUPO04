import React, { useState } from "react";
import './loading.css'

export default function Loading(){
    const [loading, setLoading] = useState(<div><img className="loadingImg" src='https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif' alt='loading'/></div>)
    
    setTimeout(() => {
        setLoading(
            <div>
                <img className="loadingImg" src="https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665938859/no-hay-resultados_wth0ex.png" alt="notFoundImg"/>
                <h3 className="loadingText">No encontramos el producto que buscas</h3>
            </div>
        )
    }, 3000);
    
    return(
        <div className="LoadingPage">
            {loading}
        </div>
    )
}