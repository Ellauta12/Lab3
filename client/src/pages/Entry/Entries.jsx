// pages/Entry/Entries.jsx

import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./entry.css";

const Entries = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
            determineBMICategory(bmiValue);
        }
    };

    const determineBMICategory = (bmiValue) => {
        let category = '';
        if (bmiValue < 18.5) {
            category = 'Peso bajo';
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            category = 'Peso normal';
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            category = 'Sobrepeso';
        } else {
            category = 'Obesidad';
        }
        setCategory(category);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateBMI();
    };

    return (
        <div className='entry'>
            <Navbar />
            <div className="entriesContainer">
                <h1>Calculadora de Índice de Masa Corporal (IMC)</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="formInput"
                        type="number"
                        placeholder="Peso (kg)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <input
                        className="formInput"
                        type="number"
                        placeholder="Altura (cm)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <button className="mButton" type="submit">Calcular</button>
                </form>
                {bmi && (
                    <div className="bmiResult">
                        <p>Tu IMC es: {bmi}</p>
                        <p>Categoría: {category}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Entries;