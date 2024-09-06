// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer'

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
      setMovie(response.data);
    };

    const fetchCredits = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
      setCredits(response.data.cast);
    };

    const fetchVideos = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
      const trailerData = response.data.results.find(video => video.type === 'Trailer');
      setTrailer(trailerData ? trailerData.key : '');
    };

    fetchMovieDetails();
    fetchCredits();
    fetchVideos();
  }, [id]);

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <Navbar />
          <Banner movies={[movie]} />
          <div className="movie-info">
            {trailer && (
              <div className="trailer">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div>
              <p>Release date: {new Date(movie.release_date).toLocaleDateString()}</p>
              <p>Duration: {movie.runtime} minutes</p>
              <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p>Assessment: {movie.vote_average} ({movie.vote_count} votes)</p>
            </div>
            <div className='cast'>
              <h2>Cast</h2>
              <ul>
                {credits.slice(0, 5).map(castMember => (
                  <li key={castMember.id}>
                    {castMember.name} as {castMember.character}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Footer/>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;