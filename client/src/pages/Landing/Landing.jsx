//pages/Landing/Landing.jsx

import React, { useContext } from 'react'
import "./landing.css"
import { AuthContext } from '../../authContext'
import { Link } from "react-router-dom"

const Landing = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className='landing'>
            <div className="header">
            </div>
            <div className="upper-layer">
                <h1>Bienvenido a <span className='brand-name'>FitnessApp</span></h1>
                <Link to={user ? '/home' : '/login'}>
                    <button className='btn-get-started'>Comenzar!</button>
                </Link>
            </div>

        </div>
    )
}

export default Landing
