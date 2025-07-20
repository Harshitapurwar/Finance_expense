import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../css/auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await API.post('/auth/login', {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem('token', res.data.token);
        navigate('/transactions');
      } else {
        await API.post('/auth/register', form);
        setIsLogin(true); // Switch to login after register
      }
    } catch (err) {
      alert(isLogin ? 'Login failed' : 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {!isLogin && (
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        <p className="auth-toggle">
          {isLogin ? 'Don’t have an account?' : 'Already registered?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Auth;
