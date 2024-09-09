// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';

const MovieDetails = ({ onLogout}) => {
  const { type, id } = useParams();
  const [content, setContent] = useState(null);
  const [credits, setCredits] = useState([]);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
        if (response.data) {
          setContent(response.data);
          fetchCredits(id, type);
          fetchVideos(id, type);
        }
      } catch (error) {
        console.error(`Erro ao buscar ${type}:`, error);
      }
    };

    const fetchCredits = async (id, type) => {
      try {
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
        setCredits(creditsResponse.data.cast);
      } catch (error) {
        console.error("Erro ao buscar créditos:", error);
      }
    };

    const fetchVideos = async (id, type) => {
      try {
        const videosResponse = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3`);
        const trailerData = videosResponse.data.results.find(video => video.type === 'Trailer');
        setTrailer(trailerData ? trailerData.key : '');
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
      }
    };

    fetchContentDetails();
  }, [id, type]);

  return (
    <div className="movie-details">
      {content ? (
        <>
          <Navbar onLogout={onLogout} />
          <Banner movies={[content]} />
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
              <p>Release date: {new Date(content.release_date || content.first_air_date).toLocaleDateString()}</p>
              
              {/* Exibe a duração se for um filme, ou a quantidade de temporadas se for uma série */}
              {type === 'movie' ? (
                <p>Duration: {content.runtime} minutes</p>
              ) : (
                <p>Number of seasons: {content.number_of_seasons}</p>
              )}

              <p>Genres: {content.genres.map(genre => genre.name).join(', ')}</p>
              <p>Assessment: {content.vote_average} ({content.vote_count} votes)</p>
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
          <Footer />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;