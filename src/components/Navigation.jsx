import React from 'react';

const Navigation = ({ currentPage, navigateTo, isLoggedIn, onLogout }) => {
  return (
    <nav>
      <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
      <a href="#knowledgebase" onClick={(e) => { e.preventDefault(); navigateTo('knowledgebase'); }}>Knowledgebase</a>
      
      {isLoggedIn ? (
        <>
          <a href="#select-crop" onClick={(e) => { e.preventDefault(); navigateTo('select-crop'); }}>Select Crop</a>
          <a href="#dashboard" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }}>Dashboard</a>
          <a href="#logout" onClick={(e) => { e.preventDefault(); onLogout(); }}>Logout</a>
        </>
      ) : (
        <>
          <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="button">Login</a>
          <a href="#admin-login" onClick={(e) => { e.preventDefault(); navigateTo('admin-login'); }} className="button admin-login">Admin Login</a>
        </>
      )}
    </nav>
  );
};

export default Navigation;