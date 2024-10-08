// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import NetflixLogo from '../assets/netflix-logo.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário já está logado
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    if (loggedInStatus) {
      navigate('/home'); // Redireciona para a página home se já estiver logado
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = 'user@example.com';
    const validPassword = 'password';

    if (email === validEmail && password === validPassword) {
      onLogin(); // Chama a função de login
      navigate('/home'); // Redireciona para a página home
    } else {
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <>
      <div className="background-wrapper">
        <img src={NetflixLogo} alt="Netflix Logo" className="logo" onClick={() => navigate('/home')} />
        <div className="background"></div>
        <div className="login">
          <h1>Entrar</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email ou número de celular"
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button id="enter" type="submit">Entrar</button>
            <p id='or'>OU</p>
            <button type="button">Usar um código de acesso</button>
            <p><a href="#">Esqueceu a senha?</a></p>
            <div className='left'>
              <div className='check'>
                <input type="checkbox" id="check-input" />
                <label htmlFor="check-input" id="check">Lembre-se de mim</label>
              </div>
              <p>Novo por aqui? <a href="#">Assine agora</a></p>
              <p id='protect'>Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.<a href="#"> Saiba mais.</a></p>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <div>
          <p>Dúvidas? Ligue <a href="#">0800 591 2876</a></p>
          <a href='#'>Perguntas frequentes</a>
          <a href='#'>Preferências de cookies</a>
          <select id="language">
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
        </div>
        <div>
          <a href='#'>Central de Ajuda</a>
          <a href='#'>Informações corporativas</a>
        </div>
        <div><a href="#">Termos de Uso</a></div>
        <div><a href="#">Privacidade</a></div>
      </footer>
    </>
  );
};

export default Login;