import React from "react";
import AboutCard from "./auxAbout/aboutCard";
import './about.css'

export default function About(){
    const frontEnd = 'Front-End Developer'
    const backEnd = 'Back-End Developer'
    const fullStack = 'Full Stack Developer'
    const fr = 'Fr'
    const ba = 'Ba'
    const fs = 'Fs'

    const team = [
        {
            name: 'Luis Acosta',
            rol: frontEnd,
            rolLetter: fr,
            image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGmyWK_VvH-dA/profile-displayphoto-shrink_800_800/0/1659626236488?e=1673481600&v=beta&t=jzmDn3dKoCBhaZhw8W9Og45x6EL6vBZyCrjyKHU7xHc',
            description: 'Participó como coordinador de UI/UX en la toma de decisiones, diseño y supervisión de componentes procurando lograr la armonía de los estilos en toda la aplicación.',
            linkedIn: 'https://www.linkedin.com/in/react-front/',
        },
        {
            name: 'Rosibel Mendoza',
            rol: fullStack,
            rolLetter: fs,
            image: 'https://res.cloudinary.com/dnxvoi5ro/image/upload/v1667933184/ROSIBEL_u0370y.jpg',
            description: 'Coordinación de Integración Back-Front, Lógica del Proceso, Manejo del Dato, Gestión de Productos y Debugging General',
            linkedIn: 'https://www.linkedin.com/in/rosim24/',
        },
        {
            name: 'Bernardo Broscheit',
            rol: frontEnd,
            rolLetter: fr,
            image: 'https://res.cloudinary.com/de2od3piw/image/upload/v1667955300/pics/perfil_hyqwrp.webp',
            description: 'Se desempeño prioritariamente en el Front aportando sus conocimientos en el armado de componentes tales como los detalles, formularios y demas. Participo en correcciones de logica de codigos junto a sus compañeros cuando fue requerido.',
            linkedIn: 'https://www.linkedin.com/in/bernardo-broscheit-94b567144/',
        },
        {
            name: 'Enzo Maidana',
            rol: backEnd,
            rolLetter: ba,
            image: 'https://media-exp1.licdn.com/dms/image/C4D03AQHxfq8rTclUBg/profile-displayphoto-shrink_200_200/0/1653277252405?e=2147483647&v=beta&t=9Gd_Ov8-12JerSZuzImIJm-jeT0wri02fRYyGsMDshU',
            description: 'Participó en el desarrollo de las rutas, la creacion de la pasarela de pago (MP) y el deploy tanto del back, como del front. A su vez, colaboró en el debugueo de problemas y brindó ayuda en las correciones de código.',
            linkedIn: 'https://www.linkedin.com/in/enzo-maidana',
        },
        {
            name: 'Alejandro Morales',
            rol: fullStack,
            rolLetter: fs,
            image: 'https://media-exp1.licdn.com/dms/image/C4D22AQH4PRTZ3Wfv4Q/feedshare-shrink_800/0/1667955591772?e=1671062400&v=beta&t=jQwLN7-fFFut4zOh0IWtaPI_DiSZvCtba9Dy9-esW8E',
            description: 'Participó inicialmente creando la API y luego creando rutas, models y pasarela de pago (MP) en back y componentes, actions y reducer en front, tambien colaboró con compañeros para debuguear problemas propios y de otro compañero',
            linkedIn: 'https://www.linkedin.com/in/alejandro-morales-42b47123b/',
        },
        {
            name: 'Gaston Frissiones',
            rol: frontEnd,
            rolLetter: fr,
            image: 'https://res.cloudinary.com/dyycj9vam/image/upload/v1667956914/IMG_HongKong_u59r5z.jpg',
            description: 'Se desempeño en el Front aportando sus conocimientos en el armado de componentes tales como el carrito de compra, la lista de favoritos y el listado de compras de un usuario, sus funcionalidades, actions, reducer y demas tareas.',
            linkedIn: 'www.linkedin.com/in/gaston-frissiones-59ba4a253',
        }
    ]
    
    return(
        <div>
            <h1 className="aboutTitle">Conoce al equipo detrás de HenryMarket</h1>
            <div className="aboutContainer">
            {team.map(member => <AboutCard name={member.name} rol={member.rol} rolLetter={member.rolLetter} image={member.image} description={member.description} linkedIn={member.linkedIn}></AboutCard>)}
            </div>
        </div>
    )
}