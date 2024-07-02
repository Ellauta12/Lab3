import React from 'react';
import './footer.css';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='location'>
                <p>Ubicación: 25 de mayo 672 - SMT</p>
            </div>
            <div className='license'>
                <p>Licencia: Información sobre la licencia aplicable</p>
                <p>© 2024 FitnessApp. Todos los derechos reservados</p>
                
            </div>
            <div className='social-icons'>
                <a href='https://api.whatsapp.com/send?phone=543816080780&text=Hola,%20tengo%20una%20consulta.' target='_blank' rel='noopener noreferrer'>
                    <FaWhatsapp />
                </a>
                <a href='https://www.instagram.com/@tomassvarela' target='_blank' rel='noopener noreferrer'>
                    <FaInstagram />
                </a>
            </div>
        </div>
    );
}

export default Footer;
