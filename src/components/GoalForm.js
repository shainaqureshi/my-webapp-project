import React, { useState } from 'react';
import { GOAL_CATEGORIES } from '../firebase/firestore';
import './GoalForm.css';

const GoalForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || GOAL_CATEGORIES.INTELLECTUAL,
    isPublic: initialData.isPublic !== undefined ? initialData.isPublic : true,
    icon: initialData.icon || '🎯',
    completed: false,
    points: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a goal title");
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="goal-form-overlay">
      <form className="goal-form" onSubmit={handleSubmit}>
        <h3>Create New Goal</h3>
        
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value={GOAL_CATEGORIES.INTELLECTUAL}>🧠 Intellectual</option>
            <option value={GOAL_CATEGORIES.EMOTIONAL}>💗 Emotional</option>
            <option value={GOAL_CATEGORIES.SOCIAL}>🤝 Social</option>
            <option value={GOAL_CATEGORIES.PHYSICAL}>💪 Physical</option>
          </select>
        </div>

        <div className="form-group">
          <label>Goal Icon</label>
          <div className="icon-picker">
            {['🎯', '📚', '💪', '🏃', '🎮', '🎨', '🎵', '⚽', '🍎', '🧘', '💻', '✍️'].map(emoji => (
              <button
                key={emoji}
                type="button"
                className={`icon-option ${formData.icon === emoji ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Goal Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your goal..."
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your goal..."
            rows="4"
            maxLength="500"
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
            />
            <span>Make this goal public</span>
          </label>
          <p className="form-hint">Public goals are visible to other users for better engagement</p>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">Create Goal</button>
          <button type="button" className="btn-cancel-form" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
