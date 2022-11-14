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
            description: 'Participó como coordinador de UI/UX en la toma de decisiones, diseño, desarrollo y supervisión de componentes procurando lograr la armonía e integración del trabajo de todos los miembros del equipo.',
            linkedIn: 'https://www.linkedin.com/in/react-front/',
        },
        {
            name: 'Rosibel Mendoza',
            rol: fullStack,
            rolLetter: fs,
            image: 'https://res.cloudinary.com/dnxvoi5ro/image/upload/v1667933184/ROSIBEL_u0370y.jpg',
            description: 'Coordinación de integración Back-Front, lógica del proceso, manejo del dato, gestión de productos y debugging general',
            linkedIn: 'https://www.linkedin.com/in/rosim24/',
        },
        {
            name: 'Bernardo Broscheit',
            rol: frontEnd,
            rolLetter: fr,
            image: 'https://res.cloudinary.com/de2od3piw/image/upload/v1667955300/pics/perfil_hyqwrp.webp',
            description: 'Se desempeñó prioritariamente en el Front aportando sus conocimientos en el armado de componentes tales como los detalles, formularios y demas. Participó en correcciones de lógica de codigos junto a sus compañeros cuando fue requerido.',
            linkedIn: 'https://www.linkedin.com/in/bernardo-broscheit-94b567144/',
        },
        {
            name: 'Enzo Maidana',
            rol: backEnd,
            rolLetter: ba,
            image: 'https://media-exp1.licdn.com/dms/image/C4D03AQHxfq8rTclUBg/profile-displayphoto-shrink_200_200/0/1653277252405?e=2147483647&v=beta&t=9Gd_Ov8-12JerSZuzImIJm-jeT0wri02fRYyGsMDshU',
            description: 'Participó en el desarrollo de las rutas, la creación de la pasarela de pago (MP) y el deploy tanto del Back, como del Front. A su vez, colaboró en el debugueo de problemas y brindó ayuda en las correciones de código.',
            linkedIn: 'https://www.linkedin.com/in/enzo-maidana',
        },
        {
            name: 'Alejandro Morales',
            rol: fullStack,
            rolLetter: fs,
            image: 'https://media-exp1.licdn.com/dms/image/C4D22AQH4PRTZ3Wfv4Q/feedshare-shrink_800/0/1667955591772?e=1671062400&v=beta&t=jQwLN7-fFFut4zOh0IWtaPI_DiSZvCtba9Dy9-esW8E',
            description: 'Participó inicialmente creando la API y luego creando rutas, models y pasarela de pago (MP) en back y componentes, actions y reducer en Front, tambien colaboró con compañeros para debuguear problemas propios y de otro compañero',
             linkedIn: 'https://www.linkedin.com/in/alejandro-morales-42b47123b/',
        },

        {
            name: 'David Olivera',
            rol: fullStack,
            rolLetter: fs,
            image: 'https://avatars.githubusercontent.com/u/15207910?s=400&u=39025fe351715a1f670cb694e089792abed62999&v=4',
            description: 'Participó inicialmente colaborando en la creación del diseño y modelo de datos, implementando la base de datos y rutas de back end. Luego se dedicó especialmente a la gestión de usuario y seguridad de la aplicación, utilizando api de auth0. Tambien colaboró con el equipo para debuguear problemas propios y de los demás',
            linkedIn: 'https://www.linkedin.com/in/david-olivera-89/',

        },
        {
            name: 'Gaston Frissiones',
            rol: frontEnd,
            rolLetter: fr,
            image: 'https://res.cloudinary.com/dyycj9vam/image/upload/v1667956914/IMG_HongKong_u59r5z.jpg',
            description: 'Se desempeñó en el Front aportando sus conocimientos en el armado de componentes tales como el carrito de compra, la lista de favoritos y el listado de compras de un usuario, sus funcionalidades, actions, reducer y demas tareas.',
            linkedIn: 'www.linkedin.com/in/gaston-frissiones-59ba4a253',

        },
        {
            name: "Juan Lopez",
            Rol: backEnd,
            rolLetter: ba,
            image:"https://media-exp1.licdn.com/dms/image/C4E03AQFYEAXnLZKAbg/profile-displayphoto-shrink_800_800/0/1649708293531?e=1673481600&v=beta&t=srbxzUFwGmW3XvMY-eoYCdl71tC3Ljb3EDK0nINF5X0",
            description: "Se desempeñó junto con algunos compañeros en el Back, en la creación y modificación de distintas rutas relacionadas a la obtención, modificación y envío de la información desde y hacia la base de daos, según parámetros requeridos"
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
