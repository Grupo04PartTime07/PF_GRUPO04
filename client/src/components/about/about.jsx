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
            image: '',
            description: '',
            linkedIn: '',
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