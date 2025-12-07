import React, { useEffect, useRef } from 'react';
import './AdBanner.css';

const AdBanner = ({ slot, format = 'auto', responsive = 'true' }) => {
  const adRef = useRef(null);
  const publisherId = 'ca-pub-6277942797531015';
  
  // Only show ads in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  useEffect(() => {
    if (isProduction && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Ad loading error:', error);
      }
    }
  }, [isProduction]);
  
  if (!isProduction) {
    return (
      <div className="ad-placeholder">
        <p>📢 Ad Space - Will show in production</p>
        <p className="ad-note">Ads configured and ready</p>
      </div>
    );
  }

  return (
    <div className="ad-container" ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-npa="1"
      />
    </div>
  );
};

export default AdBanner;
