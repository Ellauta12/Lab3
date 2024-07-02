import React, { useState } from "react";
import "./homeComp.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import CreateMeal from "../create/CreateMeal";
import CreateRoutine from "../create/CreateRoutine";
import BMICalculator from "../create/CreateEntry"; // Asegúrate de importar tu nuevo componente

const HomeComp = ({ image, name, description, view }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddClick = () => {
    console.log("Add button clicked for", name); // Log para depuración
    setOpenPopup(true);
  };

  return (
    <div className="homeCompContainer">
      <div className="imgCont">
        <img src={image} alt={name} />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="buttons">
        <div className="createButton">
          <button onClick={handleAddClick}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p>Calcular</p>
        </div>
        <div className="viewButton">
          <Link to={view}></Link>
        </div>
      </div>
      {openPopup && name === "Comidas" && <CreateMeal setOpen={setOpenPopup} />}
      {openPopup && name === "IMC" && <BMICalculator setOpen={setOpenPopup} />}
      {openPopup && name === "Rutinas" && <CreateRoutine setOpen={setOpenPopup} />}
    </div>
  );
};

export default HomeComp;