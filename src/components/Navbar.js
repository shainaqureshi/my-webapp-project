import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logOut } from '../firebase/firebase';
import './Navbar.css';

const Navbar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎯 Share Your Goals
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <Link to="/feed" className={`nav-link ${isActive('/feed')}`}>
              Feed
            </Link>
          </li>
          <li>
            <Link to="/my-goals" className={`nav-link ${isActive('/my-goals')}`}>
              My Goals
            </Link>
          </li>
          {currentUser?.email === 'shainaqureshi@gmail.com' && (
            <li>
              <Link to="/find-users" className={`nav-link ${isActive('/find-users')}`}>
                Find Users
              </Link>
            </li>
          )}
          <li>
            <Link to="/recommendations" className={`nav-link ${isActive('/recommendations')}`}>
              My Recommendations
            </Link>
          </li>
          <li>
            <Link to="/local-news" className={`nav-link ${isActive('/local-news')}`}>
              📍 Local News
            </Link>
          </li>
          <li>
            <Link to="/fun-spots" className={`nav-link ${isActive('/fun-spots')}`}>
              🎉 Fun Spots
            </Link>
          </li>
        </ul>

        <div className="navbar-user">
          {currentUser && (
            <>
              <div className="user-info">
                {currentUser.photoURL && (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName} 
                    className="user-avatar"
                  />
                )}
                <span className="user-name">{currentUser.displayName || 'User'}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
