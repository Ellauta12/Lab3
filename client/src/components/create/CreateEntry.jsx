import './popUp.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const BMICalculator = ({ setOpen }) => {
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
        <div className="modal">
            <div className="mContainer">
                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />
                
                <div className="mTitle">Calculadora de IMC</div>
                
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
                        <p>Categoria: {category}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BMICalculator;