// src/components/Banner/Banner.jsx
import React, { useState, useEffect } from 'react';
import './Banner.css';
import { FaPlay, FaPlus } from 'react-icons/fa'; // Importando os ícones

const Banner = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 15000); // Muda o filme a cada 5 segundos

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentIndex];

  return (
    <div 
      className="banner" 
      style={{
        backgroundSize: "cover",
        backgroundImage: currentMovie && currentMovie.backdrop_path 
          ? `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})` 
          : 'none',
        backgroundPosition: "center center"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentMovie && (
        <div className="banner-content">
          <h1>{currentMovie.title || currentMovie.name}</h1>
          <p>{currentMovie.overview}</p>
          <div className="banner-buttons">
            <button className="play-button">
              <FaPlay /> Assistir
            </button>
            <button className="more-button">
              <FaPlus /> Minha Lista
            </button>
          </div>
        </div>
      )}
      {movies.length > 1 && (
        <div className="banner-indicators">
          {movies.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;