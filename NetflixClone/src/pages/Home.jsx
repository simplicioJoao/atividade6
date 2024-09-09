// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from '../components/Row/Row';
import './Home.css';
import Banner from '../components/Banner/Banner';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Home = ({ onLogout }) => { // Recebe a função onLogout como prop
  const [movies, setMovies] = useState({
    trending: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
    netflixOriginals: [], // Adicione a propriedade para os originais da Netflix
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingResponse = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3');
      const actionResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=28');
      const comedyResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=35');
      const horrorResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=27');
      const romanceResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=10749');
      const documentariesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=99');
      const netflixResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_networks=213'); // Buscando originais da Netflix

      setMovies({
        trending: trendingResponse.data.results.map(item => ({
          ...item,
          media_type: item.media_type || 'movie',
        })),
        actionMovies: actionResponse.data.results.map(item => ({
          ...item,
          media_type: 'movie',
        })),
        comedyMovies: comedyResponse.data.results.map(item => ({
          ...item,
          media_type: 'movie',
        })),
        horrorMovies: horrorResponse.data.results.map(item => ({
          ...item,
          media_type: 'movie',
        })),
        romanceMovies: romanceResponse.data.results.map(item => ({
          ...item,
          media_type: 'movie',
        })),
        documentaries: documentariesResponse.data.results.map(item => ({
          ...item,
          media_type: 'movie',
        })),
        netflixOriginals: netflixResponse.data.results, // Adicionando os originais da Netflix ao estado
      });
    };
    fetchMovies();
  }, []);

  return (
    <div className="home">
      <Navbar onLogout={onLogout} /> {/* Passa a função de logout para a Navbar */}
      <Banner movies={movies.netflixOriginals.slice(0, 5)} /> {/* Usar apenas os originais da Netflix */}
      <Row title="Trending" movies={movies.trending} />
      <Row title="Action" movies={movies.actionMovies} />
      <Row title="Comedy" movies={movies.comedyMovies} />
      <Row title="Horror" movies={movies.horrorMovies} />
      <Row title="Romance" movies={movies.romanceMovies} />
      <Row title="Documentaries" movies={movies.documentaries} />
      <Footer />
    </div>
  );
};

export default Home;