import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Configuracao from './components/Configuracao';
import Avaliacao from './components/Avaliacao';
import Register from './components/Register'; // Import Register component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Clear login status
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
        />
        {/* Register route */}
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />
        {/* Protected routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/configuracao"
          element={isLoggedIn ? <Configuracao /> : <Navigate to="/login" />}
        />
        <Route
          path="/avaliacao"
          element={isLoggedIn ? <Avaliacao /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
