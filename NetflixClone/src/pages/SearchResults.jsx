// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from '../components/Row/Row';
import Navbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import './SearchResults.css'

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=cae43bbdae6ea3e5f4a4c29c03ae01d3&query=${query}`);
      setResults(response.data.results);
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results">
      <Navbar/>
      <h2>Resultados da Pesquisa para: {query}</h2>
      <Row title="Resultados" movies={results} />
    </div>
  );
};

export default SearchResults;