import React, { useState } from 'react';
import './imc.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const BMICalculator = () => {
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
        <>
            <Navbar />
            <div className="mainContainer">
                <div className="calorieCalculator">
                    <h3>Calculadora de IMC</h3>
                    <div className="calculatorInputs">
                        <label>
                            Peso (kg):
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </label>
                        <label>
                            Altura (cm):
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Calcular IMC</button>
                    {bmi && (
                        <div className="results">
                            <p>Tu IMC es: {bmi}</p>
                            <p>Categoría: {category}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BMICalculator;
