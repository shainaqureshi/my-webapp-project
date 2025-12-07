import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserGoals, createGoal, updateGoal, deleteGoal, GOAL_CATEGORIES } from '../firebase/firestore';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import AdBanner from './AdBanner';
import './MyGoals.css';

const MyGoals = () => {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    points: 0,
    streak: 0
  });

  useEffect(() => {
    loadGoals();
  }, [currentUser]);

  useEffect(() => {
    calculateStats();
  }, [goals]);

  const loadGoals = async () => {
    if (!currentUser) return;
    try {
      const userGoals = await getUserGoals(currentUser.uid);
      setGoals(userGoals);
    } catch (error) {
      console.error("Error loading goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const completed = goals.filter(g => g.completed).length;
    const totalPoints = goals.reduce((sum, g) => sum + (g.points || 0), 0);
    
    // Calculate streak (consecutive days with completed goals)
    const sortedCompletions = goals
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
      total: goals.length,
      completed,
      points: totalPoints,
      streak
    });
  };

  const handleCreateGoal = async (goalData) => {
    try {
      await createGoal(currentUser.uid, goalData);
      await loadGoals();
      setShowForm(false);
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Failed to create goal. Please try again.");
    }
  };

  const handleUpdateGoal = async (goalId, goalData) => {
    try {
      await updateGoal(goalId, goalData);
      await loadGoals();
      setEditingGoal(null);
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal. Please try again.");
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      await deleteGoal(goalId);
      await loadGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("Failed to delete goal. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading your goals...</div>;
  }

  return (
    <div className="my-goals">
      <div className="goals-header">
        <h2>My Goals</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add New Goal
        </button>
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

      <div className="goals-info">
        <p>📅 Complete goals daily to build your streak!</p>
        <p>⭐ Earn 10 points for each completed goal</p>
        <p>🌐 Set to Public for better engagement</p>
      </div>

      <AdBanner slot="7976557312" format="horizontal" />

      {showForm && (
        <GoalForm
          onSubmit={handleCreateGoal}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="goals-grid">
        {Object.values(GOAL_CATEGORIES).map(category => {
          const categoryGoals = goals.filter(g => g.category === category);
          return categoryGoals.length > 0 ? (
            categoryGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={() => setEditingGoal(goal)}
                onDelete={() => handleDeleteGoal(goal.id)}
                isEditing={editingGoal?.id === goal.id}
                onUpdate={(data) => handleUpdateGoal(goal.id, data)}
                onCancelEdit={() => setEditingGoal(null)}
              />
            ))
          ) : (
            <div key={category} className="empty-category">
              <span className="category-icon">
                {category === GOAL_CATEGORIES.INTELLECTUAL && '🧠'}
                {category === GOAL_CATEGORIES.EMOTIONAL && '💗'}
                {category === GOAL_CATEGORIES.SOCIAL && '🤝'}
                {category === GOAL_CATEGORIES.PHYSICAL && '💪'}
              </span>
              <p className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
              <p className="empty-message">No goal set yet</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyGoals;
