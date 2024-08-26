import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>An error occurred. Please try again later.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default ErrorPage;
