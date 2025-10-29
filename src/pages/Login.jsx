import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Login = ({ onLogin, navigateTo }) => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  useEffect(() => {
    const adminLogin = localStorage.getItem('adminLogin');
    if (adminLogin) {
      setIsAdminLogin(true);
      localStorage.removeItem('adminLogin');
    }
  }, []);
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address (e.g., user@example.com)');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be at least 8 characters and include one special character');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setServerError('');
      const base = `${API_URL}/auth`;
      if (mode === 'login') {
        fetch(base + '/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
          .then(r => r.json())
          .then(data => {
            if (data.error) return setServerError(data.error);
            // store token if provided
            if (data.token) {
              localStorage.setItem('fa_token', data.token);
              // Check if user has any selections
              fetch(`${API_URL}/selections`, {
                headers: {
                  'Authorization': `Bearer ${data.token}`
                }
              })
                .then(r => r.json())
                .then(selections => {
                  onLogin(selections.length > 0 ? 'dashboard' : 'select-crop');
                })
                .catch(() => onLogin('select-crop')); // Default to select-crop on error
            }
          })
          .catch(err => setServerError('Login failed'));
      } else {
        fetch(base + '/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
          .then(r => r.json())
          .then(data => {
            if (data.error) return setServerError(data.error);
            if (data.token) localStorage.setItem('fa_token', data.token);
            onLogin();
          })
          .catch(err => setServerError('Registration failed'));
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="auth-toggle" role="tablist" aria-label="Authentication mode">
          <button type="button" onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>Login</button>
          <button type="button" onClick={() => setMode('register')} className={mode === 'register' ? 'active' : ''}>Register</button>
        </div>
        {mode === 'register' && (
          <>
            <label htmlFor="name">Name:</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </>
        )}

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <div id="email-error" style={{color: 'red', fontSize: '0.9em', minHeight: '20px'}}>
          {emailError}
        </div>

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <div id="password-error" style={{color: 'red', fontSize: '0.9em', minHeight: '20px'}}>
          {passwordError}
        </div>

        {serverError && <div style={{ color: 'red', marginTop: '0.5rem' }}>{serverError}</div>}

        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>

      {/* Contact Us Section */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '8px',
        border: '1px solid #ddd',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '2rem auto'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.2rem' }}>
          📧 Need Help?
        </h3>
        <p style={{ margin: '0.5rem 0', color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
          For queries, password issues, feedback, or development ideas, please contact us at:
        </p>
        <a 
          href="mailto:231fa04094@vignan.ac.in" 
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            padding: '8px 16px',
            background: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#45a049'}
          onMouseOut={(e) => e.target.style.background = '#4CAF50'}
        >
          231fa04094@vignan.ac.in
        </a>
      </div>
    </div>
  );
};

export default Login;