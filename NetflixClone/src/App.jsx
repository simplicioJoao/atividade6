// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; // Importando ProtectedRoute

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar o login

  // Efeito para verificar o estado de login no localStorage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Atualiza o estado para logado
    localStorage.setItem('loggedIn', 'true'); // Armazena no localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Atualiza o estado para deslogado
    localStorage.removeItem('loggedIn'); // Remove do localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Passa a função de login */}
        <Route path="/home" element={<ProtectedRoute element={<Home onLogout={handleLogout} />} isLoggedIn={isLoggedIn} />} />
        <Route path="/:type/:id" element={<ProtectedRoute element={<MovieDetails onLogout={handleLogout} />} isLoggedIn={isLoggedIn} />} />
        <Route path="/search/:query" element={<ProtectedRoute element={<SearchResults onLogout={handleLogout} />} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;