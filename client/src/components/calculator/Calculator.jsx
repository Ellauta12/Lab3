// components/Calculator.jsx
import React, { useState } from 'react';
import './calculator.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Calculator = () => {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [exerciseLevel, setExerciseLevel] = useState('sedentary');
    const [maintenanceCalories, setMaintenanceCalories] = useState(0);
    const [weightLossCalories, setWeightLossCalories] = useState(0);
    const [weightGainCalories, setWeightGainCalories] = useState(0);

    const handleCalculate = () => {
        let bmr = 0;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        let calorieIntake = 0;
        switch (exerciseLevel) {
            case 'sedentary':
                calorieIntake = bmr * 1.2;
                break;
            case 'lightlyActive':
                calorieIntake = bmr * 1.375;
                break;
            case 'moderatelyActive':
                calorieIntake = bmr * 1.55;
                break;
            case 'veryActive':
                calorieIntake = bmr * 1.725;
                break;
            case 'extraActive':
                calorieIntake = bmr * 1.9;
                break;
            default:
                calorieIntake = bmr * 1.2;
                break;
        }

        setMaintenanceCalories(calorieIntake.toFixed(0));
        setWeightLossCalories((calorieIntake - 500).toFixed(0));
        setWeightGainCalories((calorieIntake + 500).toFixed(0));
    };

    return (
        <>
            <Navbar />
            <div className="mainContainer">
                <div className="calorieCalculator">
                    <h3>Calculadora de Calorías</h3>
                    <div className="calculatorInputs">
                        <label>
                            Género:
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </label>
                        <label>
                            Peso (kg):
                            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </label>
                        <label>
                            Edad:
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                        </label>
                        <label>
                            Altura (cm):
                            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                        </label>
                        <label>
                            Nivel de ejercicio:
                            <select value={exerciseLevel} onChange={(e) => setExerciseLevel(e.target.value)}>
                                <option value="sedentary">Sedentario (poco o nada de ejercicio)</option>
                                <option value="lightlyActive">Ligeramente activo (ejercicio ligero/deportes de 1 a 3 días a la semana)</option>
                                <option value="moderatelyActive">Moderadamente activo (ejercicio moderado/deportes de 3 a 5 días a la semana)</option>
                                <option value="veryActive">Muy activo (ejercicio/deportes intensos 6-7 días a la semana)</option>
                                <option value="extraActive">Extra Activo (ejercicio muy duro/deportes y trabajo físico)</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={handleCalculate}>Calcular Calorías</button>
                    {maintenanceCalories > 0 && (
                        <div className="results">
                            <p>Para mantener el peso: {maintenanceCalories} calorías por día</p>
                            <p>Para bajar de peso: {weightLossCalories} calorías por día</p>
                            <p>Para subir de peso: {weightGainCalories} calorías por día</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Calculator;
