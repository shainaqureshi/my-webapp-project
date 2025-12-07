import React from 'react';
import { signInWithGoogle, signInAsGuest } from '../firebase/firebase';
import './Login.css';

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  const handleGuestSignIn = async () => {
    try {
      await signInAsGuest();
    } catch (error) {
      console.error("Guest login error:", error);
      alert("Failed to continue as guest. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Share Your Goals</h1>
        <p className="login-subtitle">Track, share, and achieve your goals together</p>
        <button className="google-signin-btn" onClick={handleGoogleSignIn}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64,9.2c0-0.74-0.06-1.28-0.19-1.84H9v3.34h4.96c-0.1,0.83-0.64,2.08-1.84,2.92l2.84,2.2c1.7-1.57,2.68-3.88,2.68-6.62Z"/>
            <path fill="#34A853" d="M9,18c2.43,0,4.47-0.8,5.96-2.18l-2.84-2.2c-0.76,0.53-1.78,0.9-3.12,0.9-2.38,0-4.4-1.57-5.12-3.74L0.97,13.04C2.45,15.98,5.48,18,9,18Z"/>
            <path fill="#FBBC05" d="M3.88,10.78c-0.18-0.53-0.29-1.1-0.29-1.78s0.11-1.25,0.29-1.78L0.97,4.96C0.35,6.2,0,7.56,0,9s0.35,2.8,0.97,4.04l2.91-2.26Z"/>
            <path fill="#EA4335" d="M9,3.58c1.32,0,2.42,0.53,3.16,1.53l2.37-2.37C13.47,1.09,11.43,0,9,0C5.48,0,2.45,2.02,0.97,4.96l2.91,2.26C4.6,5.15,6.62,3.58,9,3.58Z"/>
          </svg>
          Sign in with Google
        </button>
        
        <div className="login-divider">
          <span>or</span>
        </div>
        
        <button className="guest-signin-btn" onClick={handleGuestSignIn}>
          <span className="guest-icon">👤</span>
          Continue as Guest
        </button>
        
        <p className="guest-note">Guest mode: Your data stays on this device only</p>
        
        <div className="login-features">
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <span>Set weekly goals</span>
          </div>
          <div className="feature">
            <span className="feature-icon">👥</span>
            <span>Share with community</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Track your progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
