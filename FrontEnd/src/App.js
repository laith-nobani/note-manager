import './App.css';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLogged, setLogged] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/home" /> : <Login setLogged={setLogged} />}
        />
        <Route
          path="/register"
          element={isLogged ? <Navigate to="/home" /> : <Register  setLogged={setLogged}/>}
        />
        <Route
          path="/home"
          element={isLogged ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
