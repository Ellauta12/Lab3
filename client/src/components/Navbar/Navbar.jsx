// components/Navbar/Navbar.jsx

import './navbar.css';
import { useState, useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext';
import Chatbot from '../chatbot/ChatBot'; // Asegúrate de importar el Chatbot

const Navbar = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Nuevo estado

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <div className='navContainer'>
            <Link to='/home'>
                <p className='navLogo'>FitnessApp</p>
            </Link>

            <input type='checkbox' id='menu-bar' />
            <label htmlFor='menu-bar'>
                <FontAwesomeIcon icon={faBars} className='icon' />
            </label>
            <nav className='navbar'>
                <ul>
                <Link to='/home'>
                        <li>
                            <p>Home</p>
                        </li>
                    </Link>
                    <Link to='/store'>
                        <li>
                            <p>Tienda</p>
                        </li>
                    </Link>
                    <Link to='/imc'>
                        <li>
                            <p>IMC</p>
                        </li>
                    </Link>
                    <Link to='/calculator'>
                        <li>
                            <p>Calculadora</p>
                        </li>
                    </Link>
                    {/* Usamos un <li> en lugar de <Link> para manejar el click y abrir el chatbot */}
                    <li onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
                        <Link to=''>
                        <li>
                            <p>Chat Bot</p>
                        </li>
                    </Link>
                    </li>
                    <Link to='/register'>
                        <li>
                            <p>Registrarse</p>
                        </li>
                    </Link>
                    <Link to='/login'>
                        <li>
                            <p>Cerrar Sesion</p>
                        </li>
                    </Link>
                    {user ? (
                        <>
                            <li onClick={handleClick} style={{ cursor: 'pointer' }}>
                                <p>Salir</p>
                            </li>
                            <Link to={`/user/${user._id}`}>
                                <li>
                                    <div className='profilePicture'>
                                        <img
                                            src={user.profilePicture || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                                            alt=''
                                        />
                                    </div>
                                </li>
                                <li id='usernamename'>
                                    <p>{user.username}</p>
                                </li>
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Add links for non-authenticated users if needed */}
                        </>
                    )}
                </ul>
            </nav>
            {isChatbotOpen && <Chatbot />} {/* Renderizamos el Chatbot si isChatbotOpen es true */}
        </div>
    );
};

export default Navbar;
