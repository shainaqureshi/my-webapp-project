import React, { useState } from 'react';
import { GOAL_CATEGORIES, uploadGoalPhoto, addPhotoToGoal, updateGoal } from '../firebase/firestore';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import './GoalCard.css';

const GoalCard = ({ goal, onEdit, onDelete, isEditing, onUpdate, onCancelEdit }) => {
  const { currentUser } = useAuth();
  const [editedTitle, setEditedTitle] = useState(goal.title);
  const [editedDescription, setEditedDescription] = useState(goal.description);
  const [editedIsPublic, setEditedIsPublic] = useState(goal.isPublic);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const getCategoryColor = (category) => {
    switch (category) {
      case GOAL_CATEGORIES.INTELLECTUAL:
        return '#4A90E2';
      case GOAL_CATEGORIES.EMOTIONAL:
        return '#E91E63';
      case GOAL_CATEGORIES.SOCIAL:
        return '#FF9800';
      case GOAL_CATEGORIES.PHYSICAL:
        return '#4CAF50';
      default:
        return '#999';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case GOAL_CATEGORIES.INTELLECTUAL:
        return '🧠';
      case GOAL_CATEGORIES.EMOTIONAL:
        return '💗';
      case GOAL_CATEGORIES.SOCIAL:
        return '🤝';
      case GOAL_CATEGORIES.PHYSICAL:
        return '💪';
      default:
        return '🎯';
    }
  };

  const handleSave = () => {
    onUpdate({
      title: editedTitle,
      description: editedDescription,
      isPublic: editedIsPublic,
      category: goal.category
    });
  };

  const handleShare = () => {
    const shareText = `Check out my goal: ${goal.title}\n${goal.description}\n\nFrom: Share Your Goals`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Goal copied to clipboard! You can now paste and share it.');
    }).catch(() => {
      alert('Failed to copy. Please try again.');
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploadingPhoto(true);
    try {
      const photoData = await uploadGoalPhoto(goal.id, currentUser.uid, file);
      const currentPhotos = Array.isArray(goal.photos) ? goal.photos : [];
      await addPhotoToGoal(goal.id, [...currentPhotos, photoData]);
      alert('Photo uploaded successfully! 📸');
      setShowPhotoUpload(false);
      window.location.reload(); // Refresh to show new photo
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const newCompletedStatus = !goal.completed;
      const pointsToAdd = newCompletedStatus ? 10 : -10;
      
      await updateGoal(goal.id, {
        completed: newCompletedStatus,
        points: (goal.points || 0) + pointsToAdd,
        completedAt: newCompletedStatus ? new Date().toISOString() : null
      });

      // Confetti celebration!
      if (newCompletedStatus) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      window.location.reload();
    } catch (error) {
      console.error('Error toggling goal completion:', error);
      alert('Failed to update goal status');
    }
  };

  const handleAddReaction = async (emoji) => {
    try {
      const reactions = goal.reactions || {};
      const userReactions = reactions[currentUser.uid] || [];
      
      // Toggle reaction
      const newUserReactions = userReactions.includes(emoji)
        ? userReactions.filter(r => r !== emoji)
        : [...userReactions, emoji];
      
      await updateGoal(goal.id, {
        reactions: {
          ...reactions,
          [currentUser.uid]: newUserReactions
        }
      });

      setShowReactions(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="goal-card" style={{ borderLeftColor: getCategoryColor(goal.category) }}>
      <div className="goal-header">
        <div className="category-badge" style={{ background: getCategoryColor(goal.category) }}>
          <span className="category-icon">{getCategoryIcon(goal.category)}</span>
          <span className="category-name">
            {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
          </span>
        </div>
        {!isEditing && (
          <div className="goal-actions">
            <button 
              className={`btn-icon ${goal.completed ? 'completed' : ''}`}
              onClick={handleToggleComplete} 
              title={goal.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {goal.completed ? '✅' : '⭕'}
            </button>
            <button className="btn-icon" onClick={() => setShowReactions(!showReactions)} title="React">
              ❤️
            </button>
            <button className="btn-icon" onClick={handleShare} title="Share Goal">
              🔗
            </button>
            <button className="btn-icon" onClick={onEdit} title="Edit">
              ✏️
            </button>
            <button className="btn-icon" onClick={onDelete} title="Delete">
              🗑️
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="goal-edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
            placeholder="Goal title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
            placeholder="Goal description"
            rows="3"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={editedIsPublic}
              onChange={(e) => setEditedIsPublic(e.target.checked)}
            />
            <span>Public</span>
          </label>
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={onCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="goal-content">
          <div className="goal-title-row">
            <span className="goal-icon">{goal.icon || '🎯'}</span>
            <h3 className={`goal-title ${goal.completed ? 'completed-title' : ''}`}>{goal.title}</h3>
          </div>
          <p className="goal-description">{goal.description}</p>

          {/* Reactions Picker */}
          {showReactions && (
            <div className="reactions-picker">
              {['👍', '❤️', '🔥', '💪', '🎉', '👏', '⭐', '🚀'].map(emoji => (
                <button
                  key={emoji}
                  className="reaction-option"
                  onClick={() => handleAddReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Display Reactions */}
          {goal.reactions && Object.keys(goal.reactions).length > 0 && (
            <div className="goal-reactions">
              {Object.values(goal.reactions).flat().reduce((acc, emoji) => {
                acc[emoji] = (acc[emoji] || 0) + 1;
                return acc;
              }, {}) && Object.entries(
                Object.values(goal.reactions).flat().reduce((acc, emoji) => {
                  acc[emoji] = (acc[emoji] || 0) + 1;
                  return acc;
                }, {})
              ).map(([emoji, count]) => (
                <span key={emoji} className="reaction-badge">
                  {emoji} {count}
                </span>
              ))}
            </div>
          )}
          
          {/* Photo Upload Section */}
          {showPhotoUpload && (
            <div className="photo-upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="photo-input"
                id={`photo-upload-${goal.id}`}
              />
              <label htmlFor={`photo-upload-${goal.id}`} className="photo-upload-label">
                {uploadingPhoto ? '📤 Uploading...' : '📸 Choose Photo'}
              </label>
              <p className="photo-hint">Add a photo as proof of completion!</p>
            </div>
          )}

          {/* Display Photos */}
          {goal.photos && goal.photos.length > 0 && (
            <div className="goal-photos">
              {goal.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo.url} alt={`Goal proof ${index + 1}`} className="goal-photo" />
                  <span className="photo-date">{new Date(photo.uploadedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}

          <div className="goal-footer">
            <div className="goal-meta">
              <span className="goal-visibility">
                {goal.isPublic ? '🌐 Public' : '🔒 Private'}
              </span>
              {goal.points > 0 && (
                <span className="goal-points">⭐ {goal.points} pts</span>
              )}
              {goal.completed && (
                <span className="goal-status">✅ Completed</span>
              )}
            </div>
            {goal.createdAt && (
              <span className="goal-date">{formatDate(goal.createdAt)}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
