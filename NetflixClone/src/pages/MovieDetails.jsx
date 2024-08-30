// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner/Banner'; // Importando o Banner

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <Navbar/>
          <Banner movies={[movie]} /> {/* Passando o filme clicado como um array para o Banner */}
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default MovieDetails;