import React, { useState } from 'react';

const AdminLogin = ({ onAdminLogin, navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === 'admin@outlook.in' && password === 'admin123') {
      localStorage.setItem('fa_token', 'admin_token');
      localStorage.setItem('isAdmin', 'true');
      setError('');
      onAdminLogin('admin-dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@outlook.in"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="admin123"
        />
        {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
        <button type="submit">Login as Admin</button>
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

export default AdminLogin;
