import React, { useState, useEffect } from 'react';
import { API_URL } from './config';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import SelectCrop from './pages/SelectCrop';
import Dashboard from './pages/Dashboard';
import Timeline from './pages/Timeline';
import KnowledgeBase from './pages/KnowledgeBase';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cropData, setCropData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Inactivity timeout (10 minutes = 600000 ms)
  const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes
  let inactivityTimer = null;

  // Reset inactivity timer on user activity
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    
    // Only set timer if user is logged in
    if (isLoggedIn || isAdmin) {
      inactivityTimer = setTimeout(() => {
        alert('You have been logged out due to inactivity (10 minutes).');
        if (isAdmin) {
          handleAdminLogout();
        } else {
          handleLogout();
        }
      }, INACTIVITY_TIMEOUT);
    }
  };

  // Track user activity
  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners for user activity
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Start timer on mount if logged in
    resetInactivityTimer();

    // Cleanup
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isLoggedIn, isAdmin]);

  // Check user session on mount
  useEffect(() => {
    const userToken = localStorage.getItem('fa_token');
    const adminToken = localStorage.getItem('fa_admin_token');
    
    if (adminToken) {
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
      resetInactivityTimer();
    } else if (userToken) {
      setIsLoggedIn(true);
      // Check if user has selections to determine page
      fetch(`${API_URL}/selections`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
        .then(r => r.json())
        .then(selections => {
          if (selections.length > 0) {
            setCurrentPage('dashboard');
          } else {
            setCurrentPage('select-crop');
          }
          resetInactivityTimer();
        })
        .catch(() => {
          setCurrentPage('select-crop');
          resetInactivityTimer();
        });
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (page) => {
    setIsLoggedIn(true);
    setCurrentPage(page || 'select-crop');
    resetInactivityTimer();
  };

  const handleCropSelect = (data) => {
    setCropData(data);
    setCurrentPage('dashboard');
    resetInactivityTimer();
  };

  const handleLogout = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    localStorage.removeItem('fa_token');
    setIsLoggedIn(false);
    setCropData(null);
    setCurrentPage('home');
  };

  const handleAdminLogin = (page) => {
    setIsAdmin(true);
    setCurrentPage(page);
    resetInactivityTimer();
  };

  const handleAdminLogout = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    localStorage.removeItem('fa_admin_token');
    setIsAdmin(false);
    setCurrentPage('home');
  };

  return (
    <div className="App" style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        title={currentPage === 'home' ? 'FarmAssist' : 
               currentPage === 'login' ? 'FarmAssist Login' : 
               currentPage === 'knowledgebase' ? 'Knowledgebase' : 
               currentPage === 'dashboard' ? 'Crop Dashboard' : 
               'FarmAssist'} 
        subtitle={currentPage === 'home' ? 'Your Companion for Smarter Farming' : 
                 currentPage === 'knowledgebase' ? 'Government-approved fertilizers and pesticides to help farmers make informed choices' : 
                 currentPage === 'dashboard' ? 'Overview of your selected crops and details' : ''} 
      />
      
      <Navigation 
        currentPage={currentPage}
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          {currentPage === 'home' && <Home navigateTo={navigateTo} />}
          {currentPage === 'login' && <Login onLogin={handleLogin} navigateTo={navigateTo} />}
          {currentPage === 'select-crop' && <SelectCrop onCropSelect={handleCropSelect} navigateTo={navigateTo} onSessionExpired={handleLogout} />}
          {currentPage === 'dashboard' && <Dashboard cropData={cropData} navigateTo={navigateTo} onSessionExpired={handleLogout} />}
          {currentPage === 'timeline' && <Timeline cropData={cropData} navigateTo={navigateTo} />}
          {currentPage === 'knowledgebase' && <KnowledgeBase navigateTo={navigateTo} />}
          {currentPage === 'admin-login' && <AdminLogin onAdminLogin={handleAdminLogin} navigateTo={navigateTo} />}
          {currentPage === 'admin-dashboard' && isAdmin && <AdminDashboard onLogout={handleAdminLogout} />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;