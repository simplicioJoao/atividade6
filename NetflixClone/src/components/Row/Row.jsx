// src/components/Row/Row.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Row.css';

const Row = ({ title, movies }) => {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map(movie => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="row-poster"
            onClick={() => handleMovieClick(movie.id)} // Adicionando o manipulador de clique
          />
        ))}
      </div>
    </div>
  );
};

export default Row;