// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/" replace />; // Redireciona para a página de login se não estiver logado
};

export default ProtectedRoute;