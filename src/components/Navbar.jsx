import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-icon">📊</span>
          <span className="brand-text">Churn Predict</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className={isActive('/')}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/prediction" className={isActive('/prediction')}>
            <span className="nav-icon">🔮</span>
            Prediction
          </Link>
          <Link to="/insights" className={isActive('/insights')}>
            <span className="nav-icon">📊</span>
            Insights
          </Link>
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <span className="theme-icon">
              {isDarkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
        
        <div className="navbar-mobile">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle mobile-theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-brand" onClick={closeMobileMenu}>
              <span className="brand-icon">📊</span>
              <span className="brand-text">Churn Predict</span>
            </Link>
            <button 
              className="mobile-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          
          <div className="mobile-menu-content">
            <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
              <span className="nav-arrow">→</span>
            </Link>
            <Link to="/prediction" className={`mobile-nav-link ${location.pathname === '/prediction' ? 'active' : ''}`} onClick={closeMobileMenu}>
              <span className="nav-icon">🔮</span>
              <span>Prediction</span>
              <span className="nav-arrow">→</span>
            </Link>
            <Link to="/insights" className={`mobile-nav-link ${location.pathname === '/insights' ? 'active' : ''}`} onClick={closeMobileMenu}>
              <span className="nav-icon">📊</span>
              <span>Insights</span>
              <span className="nav-arrow">→</span>
            </Link>
          </div>
          
          <div className="mobile-menu-footer">
            <div className="theme-selector">
              <span>Theme</span>
              <button 
                onClick={toggleTheme}
                className="mobile-theme-toggle"
              >
                <span className={`theme-option ${!isDarkMode ? 'active' : ''}`}>☀️</span>
                <span className={`theme-option ${isDarkMode ? 'active' : ''}`}>🌙</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;