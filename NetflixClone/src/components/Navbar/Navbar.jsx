// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from '../../assets/netflix-logo.png';
import { FaSearch } from 'react-icons/fa'; // Importando o ícone de lupa
import { FiLogOut } from 'react-icons/fi'; // Importando o ícone de logout

const Navbar = ({ onLogout }) => { // Recebe a função onLogout como prop
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false); // Estado para controlar se a página foi rolada
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Define isScrolled como true se a página for rolada
      } else {
        setIsScrolled(false); // Define isScrolled como false se estiver no topo
      }
    };

    window.addEventListener('scroll', handleScroll); // Adiciona o listener de scroll

    return () => {
      window.removeEventListener('scroll', handleScroll); // Limpa o listener ao desmontar
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}> {/* Adiciona a classe 'scrolled' se a página for rolada */}
      <img src={NetflixLogo} alt="Netflix Logo" className="logo" onClick={() => navigate('/home')} />
      <div className="search-logout-container"> {/* Novo contêiner para a barra de pesquisa e o botão de logout */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch /> {/* Ícone de lupa */}
          </button>
        </form>
        <button className="logout-button" onClick={onLogout}><FiLogOut/></button> {/* Botão de logout */}
      </div>
    </div>
  );
};

export default Navbar;