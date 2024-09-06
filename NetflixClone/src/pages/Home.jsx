// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from '../components/Row/Row';
import './Home.css';
import Banner from '../components/Banner/Banner';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'

const Home = () => {
  const [movies, setMovies] = useState({
    trending: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingResponse = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3');
      const actionResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=28');
      const comedyResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=35');
      const horrorResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=27');
      const romanceResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=10749');
      const documentariesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&with_genres=99');

      setMovies({
        trending: trendingResponse.data.results, // Pega os 5 primeiros filmes
        actionMovies: actionResponse.data.results,
        comedyMovies: comedyResponse.data.results,
        horrorMovies: horrorResponse.data.results,
        romanceMovies: romanceResponse.data.results,
        documentaries: documentariesResponse.data.results,
      });
    };
    fetchMovies();
  }, []);

  return (
    <div className="home">
      <Navbar/>
      <Banner movies={movies.trending.slice(0, 5)} /> {/* Passando a lista de filmes em destaque para o Banner */}
      <Row title="Trending" movies={movies.trending} />
      <Row title="Action" movies={movies.actionMovies} />
      <Row title="Comedy" movies={movies.comedyMovies} />
      <Row title="Horror" movies={movies.horrorMovies} />
      <Row title="Romance" movies={movies.romanceMovies} />
      <Row title="Documentaries" movies={movies.documentaries} />
      <Footer/>
    </div>
  );
};

export default Home;