// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';

const App = () => {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;