import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../authContext";
import "./login.css";

function Login() {
  const { dispatch, user, token, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      const res = await axios.post("http://localhost:5000/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
      navigate('/users');
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.error });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "Se ha producido un error al iniciar sesión" });
      }
    }
  };
  

  return (
    <div className="login">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>Bienvenido!</h1>
          <form>
            <div className="txt_field">
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="lInput"
                value={credentials.email}
                required
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="lInput"
                value={credentials.password}
                required
              />
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Ingresar
              </button>
            </div>
            <div className="signup_link">
              <p>
                No estas registrado? <Link to="/register">Registrarse</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;