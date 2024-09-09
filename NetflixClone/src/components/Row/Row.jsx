// src/components/Row/Row.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Row.css';

const Row = ({ title, movies, isVertical, isSearchResults }) => {
  const navigate = useNavigate();
  const rowRef = useRef(null);

  const handleMovieClick = (id, mediaType) => {
    navigate(`/${mediaType}/${id}`); // Usando mediaType para construir a URL
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
      {!isSearchResults && <h2>{title}</h2>}
      <div className="row-container">
        {!isVertical && (
          <>
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
                  onClick={() => handleMovieClick(movie.id, movie.media_type)} // Passando o media_type
                />
              ))}
            </div>
            <button className="arrow right" onClick={scrollRight}>
              <FaChevronRight />
            </button>
          </>
        )}
        {isVertical && (
          <div className="row-vertical">
            {movies.map(movie => (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="row-poster row-poster-vertical"
                onClick={() => handleMovieClick(movie.id, movie.media_type)} // Passando o media_type
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Row;