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
            image: '',
            description: '',
            linkedIn: '',
        },
        {
            name: 'Enzo Maidana',
            rol: backEnd,
            rolLetter: ba,
            image: '',
            description: '',
            linkedIn: '',
        },
        {
            name: 'Alejandro Morales',
            rol: fullStack,
            rolLetter: fs,
            image: 'https://media-exp1.licdn.com/dms/image/C4D22AQHmZbdgM3LRNQ/feedshare-shrink_2048_1536/0/1667854331023?e=1670457600&v=beta&t=nE6K-cdCKvk8rlo3UpgN3yhReu4u7JFSZY5NogEyjJo',
            description: 'Participó inicialmente creando la API y luego creando rutas, models y pasarela de pago (MP) en back y componentes, actions y reducer en front, tambien colaboró con compañeros para debuguear problemas propios y de otro compañero',
            linkedIn: 'https://www.linkedin.com/in/alejandro-morales-42b47123b/',
        }
    ]
    
    return(
        <div>
            <h1>Conoce al equipo detrás de la aplicación</h1>
            <div className="aboutContainer">
            {team.map(member => <AboutCard name={member.name} rol={member.rol} rolLetter={member.rolLetter} image={member.image} description={member.description} linkedIn={member.linkedIn}></AboutCard>)}
            </div>
        </div>
    )
}