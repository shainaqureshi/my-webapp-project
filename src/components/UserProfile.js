import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserGoals } from '../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import GoalCard from './GoalCard';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    points: 0,
    streak: 0
  });

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      // Get user data
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        setUser({ id: userDoc.id, ...userDoc.data() });
      }

      // Get user's goals
      const userGoals = await getUserGoals(userId);
      console.log('All user goals:', userGoals);
      console.log('User goals with isPublic:', userGoals.map(g => ({ title: g.title, isPublic: g.isPublic })));
      const publicGoals = userGoals.filter(g => g.isPublic === true);
      console.log('Filtered public goals:', publicGoals);
      setGoals(publicGoals);

      // Calculate stats
      const completed = userGoals.filter(g => g.completed).length;
      const totalPoints = userGoals.reduce((sum, g) => sum + (g.points || 0), 0);
      
      // Calculate streak
      const sortedCompletions = userGoals
        .filter(g => g.completed && g.completedAt)
        .map(g => new Date(g.completedAt).toDateString())
        .sort((a, b) => new Date(b) - new Date(a));
      
      let streak = 0;
      let currentDate = new Date();
      
      for (let i = 0; i < sortedCompletions.length; i++) {
        const completionDate = new Date(sortedCompletions[i]);
        const daysDiff = Math.floor((currentDate - completionDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === streak) {
          streak++;
        } else if (daysDiff > streak) {
          break;
        }
      }

      setStats({
        total: userGoals.length,
        completed,
        points: totalPoints,
        streak
      });

    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="loading">User not found</div>;
  }

  return (
    <div className="user-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-large">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            <div className="avatar-placeholder-large">
              {(user.displayName || user.email || '?')[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1>{user.displayName || 'Anonymous'}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.points}</div>
          <div className="stat-label">Points</div>
        </div>
        <div className="stat-card streak">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>

      {/* Public Goals */}
      <div className="profile-goals">
        <h2>Public Goals ({goals.length})</h2>
        {goals.length === 0 ? (
          <div className="no-goals">
            <p>This user hasn't shared any public goals yet.</p>
          </div>
        ) : (
          <div className="goals-grid">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={() => {}}
                onDelete={() => {}}
                isEditing={false}
                onUpdate={() => {}}
                onCancelEdit={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
