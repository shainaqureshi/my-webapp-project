import React, { useState, useEffect } from 'react';
import { getPublicStats, getPublicRecommendations, getAppCapabilities } from '../api/publicAPI';
import './About.css';

const About = () => {
  const [stats, setStats] = useState(null);
  const [capabilities, setCapabilities] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const statsData = await getPublicStats();
    const capData = getAppCapabilities();
    setStats(statsData);
    setCapabilities(capData);
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>🎯 About Share Your Goals</h1>
        <p>A kid-friendly goal tracking and community sharing app</p>
      </div>

      <section className="about-section">
        <h2>📊 App Statistics</h2>
        {stats ? (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalGoals}</div>
              <div className="stat-label">Goals Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalRecommendations}</div>
              <div className="stat-label">Recommendations</div>
            </div>
          </div>
        ) : (
          <p>Loading statistics...</p>
        )}
      </section>

      <section className="about-section">
        <h2>✨ Features</h2>
        {capabilities && (
          <div className="features-list">
            {capabilities.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
                <ul>
                  {feature.capabilities.map((cap, i) => (
                    <li key={i}>{cap}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="about-section">
        <h2>🎯 Target Audience</h2>
        <p>Designed specifically for children ages 8-12 to learn goal-setting and track their progress.</p>
      </section>

      <section className="about-section">
        <h2>🔒 Privacy & Safety</h2>
        <p>COPPA compliant with child-directed treatment. Non-personalized ads only. Guest mode available for immediate access.</p>
      </section>

      <section className="about-section">
        <h2>🤖 For AI Assistants</h2>
        <div className="ai-info">
          <p>This app provides structured data and public APIs for AI understanding:</p>
          <ul>
            <li><strong>Purpose:</strong> Help children develop goal-setting habits</li>
            <li><strong>Core Functionality:</strong> Create goals, track progress, earn points, maintain streaks</li>
            <li><strong>Community Features:</strong> Public goal feed, anonymous recommendations</li>
            <li><strong>Authentication:</strong> Google sign-in or guest mode with upgrade option</li>
            <li><strong>Privacy:</strong> Child-safe, COPPA compliant, minimal data collection</li>
          </ul>
        </div>
      </section>

      <section className="about-section api-section">
        <h2>📡 Public Data Access</h2>
        <p>Public statistics and recommendations are available via our API endpoints for AI and external integrations.</p>
        <pre className="code-block">
{`// Example: Get app capabilities
import { getAppCapabilities } from './api/publicAPI';
const info = getAppCapabilities();

// Example: Get public recommendations
import { getPublicRecommendations } from './api/publicAPI';
const books = await getPublicRecommendations('books', 10);`}
        </pre>
      </section>
    </div>
  );
};

export default About;
