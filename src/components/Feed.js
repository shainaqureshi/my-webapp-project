import React, { useState, useEffect } from 'react';
import { getPublicGoals } from '../firebase/firestore';
import { useAuth } from '../context/AuthContext';
import GoalCard from './GoalCard';
import AdBanner from './AdBanner';
import './Feed.css';

const Feed = () => {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadPublicGoals();
  }, []);

  const loadPublicGoals = async () => {
    try {
      const publicGoals = await getPublicGoals();
      setGoals(publicGoals);
    } catch (error) {
      console.error("Error loading public goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGoals = filter === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === filter);

  if (loading) {
    return <div className="loading">Loading public goals...</div>;
  }

  return (
    <div className="feed">
      <div className="feed-header">
        <h2>Public Goals Feed</h2>
        <div className="feed-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'intellectual' ? 'active' : ''}`}
            onClick={() => setFilter('intellectual')}
          >
            🧠 Intellectual
          </button>
          <button 
            className={`filter-btn ${filter === 'emotional' ? 'active' : ''}`}
            onClick={() => setFilter('emotional')}
          >
            💗 Emotional
          </button>
          <button 
            className={`filter-btn ${filter === 'social' ? 'active' : ''}`}
            onClick={() => setFilter('social')}
          >
            🤝 Social
          </button>
          <button 
            className={`filter-btn ${filter === 'physical' ? 'active' : ''}`}
            onClick={() => setFilter('physical')}
          >
            💪 Physical
          </button>
        </div>
      </div>

      <AdBanner slot="1790600526" format="horizontal" />

      {filteredGoals.length === 0 ? (
        <div className="no-goals">
          <p>No public goals yet. Be the first to share your goals!</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999' }}>
            Make sure your goals are set to "Public" when creating them.
          </p>
        </div>
      ) : (
        <div className="goals-grid">
          {filteredGoals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal}
              isEditing={false}
              onEdit={() => {}}
              onDelete={() => {}}
              onUpdate={() => {}}
              onCancelEdit={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
