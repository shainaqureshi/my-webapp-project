import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { upgradeGuestAccount } from '../firebase/firebase';
import './UpgradeBanner.css';

const UpgradeBanner = () => {
  const { currentUser } = useAuth();
  const [upgrading, setUpgrading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Only show for anonymous users who haven't dismissed
  if (!currentUser || !currentUser.isAnonymous || dismissed) {
    return null;
  }

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      await upgradeGuestAccount();
      // User will be automatically updated by AuthContext
      alert('🎉 Account upgraded! Your progress is now saved permanently.');
    } catch (error) {
      console.error('Upgrade error:', error);
      if (error.code === 'auth/credential-already-in-use') {
        alert('This Google account is already in use. Your guest data will be lost if you sign in with that account.');
      } else {
        alert('Failed to upgrade account. Please try again.');
      }
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="upgrade-banner">
      <div className="upgrade-content">
        <div className="upgrade-icon">⚠️</div>
        <div className="upgrade-text">
          <strong>You're using Guest Mode</strong>
          <p>Upgrade to a Google account to save your progress permanently!</p>
        </div>
        <button 
          className="upgrade-btn" 
          onClick={handleUpgrade}
          disabled={upgrading}
        >
          {upgrading ? 'Upgrading...' : '🔐 Upgrade Now'}
        </button>
        <button 
          className="dismiss-btn" 
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
