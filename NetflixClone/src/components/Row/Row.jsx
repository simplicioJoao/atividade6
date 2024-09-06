// src/components/Row/Row.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Row.css';

const Row = ({ title, movies }) => {
  const navigate = useNavigate();
  const rowRef = useRef(null);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const scrollLeft = () => {
    rowRef.current.scrollBy({
      left: -500, // Ajuste a quantidade de pixels que deseja mover
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({
      left: 500, // Ajuste a quantidade de pixels que deseja mover
      behavior: 'smooth',
    });
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-container">
        <button className="arrow left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div className="row-posters" ref={rowRef}>
          {movies.map(movie => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="row-poster"
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Row;