import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Call Login API
      const loginResponse = await axios.post(process.env.REACT_APP_LOGIN_URL, {
        username,
        password,
      });

      const { session_token } = loginResponse.data;

      sessionStorage.setItem('token', session_token);

      // Step 2: Call Permission API
      const permissionResponse = await axios.get(
        process.env.REACT_APP_PERMISSION_URL,
        {
          headers: {
            Authorization: `Bearer ${session_token}`,
          },
        }
      );

      const { role, scopes } = permissionResponse.data;

      sessionStorage.setItem('role', role);
      sessionStorage.setItem('scopes', JSON.stringify(scopes));

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
