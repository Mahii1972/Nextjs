// pages/login.js
'use client'
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      Router.push('/chooseDatabase');
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 401) {
        alert('Invalid login');
        return;
      }
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const { token, expiresAt } = await response.json();
      Cookies.set('auth', token, { expires: new Date(expiresAt * 1000) });
      Router.push('/chooseDatabase');
    } catch (err) {
      console.error(err);
    }
  };

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        name="username"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
