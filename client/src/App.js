import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Entries from "./pages/Entry/Entries";
import Routines from "./pages/Routine/Routines";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import Home from "./pages/home/Home";
import Meal from "./pages/Meal/Meal";
import Store from "./components/store/Store";
import Calculator from "./components/calculator/Calculator";
import IMC from "./components/imc/IMC";
import { AuthProvider } from './authContext';

function App() {
    const { state } = useContext(AuthContext);
    const { user } = state;

    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Login title="Crear login" />;
        } else {
            return children;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/entries" element={<ProtectedRoute><Entries /></ProtectedRoute>} />
                <Route path="/meals" element={<ProtectedRoute><Meal /></ProtectedRoute>} />
                <Route path="/routines" element={<ProtectedRoute><Routines /></ProtectedRoute>} />
                <Route path="/store" element={<Store/>} />
                <Route path="/calculator" element={<Calculator/>} />
                <Route path="/imc" element={<IMC/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

