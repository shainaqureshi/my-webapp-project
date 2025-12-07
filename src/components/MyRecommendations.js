import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './MyRecommendations.css';

const MyRecommendations = () => {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('books');
  const [newRec, setNewRec] = useState({ title: '', description: '', category: 'books' });

  useEffect(() => {
    loadRecommendations();
  }, [currentUser]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const recsRef = collection(db, 'recommendations');
      const snapshot = await getDocs(recsRef);
      
      const recsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setRecommendations(recsData);
    } catch (error) {
      console.error("Error loading recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecommendation = async (e) => {
    e.preventDefault();
    if (!newRec.title.trim()) return;

    try {
      await addDoc(collection(db, 'recommendations'), {
        userId: currentUser.uid,
        title: newRec.title,
        description: newRec.description,
        category: newRec.category,
        createdAt: new Date().toISOString()
      });

      setNewRec({ title: '', description: '', category: 'books' });
      loadRecommendations();
    } catch (error) {
      console.error("Error adding recommendation:", error);
    }
  };

  const handleDeleteRecommendation = async (recId, recUserId) => {
    if (recUserId !== currentUser.uid) {
      alert("You can only delete your own recommendations");
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'recommendations', recId));
      loadRecommendations();
    } catch (error) {
      console.error("Error deleting recommendation:", error);
    }
  };

  const filteredRecs = recommendations.filter(rec => rec.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      books: '📚',
      restaurants: '🍽️',
      parks: '🏞️'
    };
    return icons[category] || '✨';
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h1>✨ My Recommendations</h1>
        <p>Share your favorite books, restaurants, and parks</p>
      </div>

      <div className="add-recommendation-form">
        <h2>Add New Recommendation</h2>
        <form onSubmit={handleAddRecommendation}>
          <select 
            value={newRec.category}
            onChange={(e) => setNewRec({...newRec, category: e.target.value})}
            className="category-select"
          >
            <option value="books">📚 Book</option>
            <option value="restaurants">🍽️ Restaurant</option>
            <option value="parks">🏞️ Recreational Park</option>
          </select>
          
          <input
            type="text"
            placeholder="Title (e.g., Book name, Restaurant name, Park name)"
            value={newRec.title}
            onChange={(e) => setNewRec({...newRec, title: e.target.value})}
            className="rec-input"
            required
          />
          
          <textarea
            placeholder="Why do you recommend this? (optional)"
            value={newRec.description}
            onChange={(e) => setNewRec({...newRec, description: e.target.value})}
            className="rec-textarea"
            rows="3"
          />
          
          <button type="submit" className="add-rec-btn">Add Recommendation</button>
        </form>
      </div>

      <div className="category-tabs">
        <button 
          className={`category-tab ${selectedCategory === 'books' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('books')}
        >
          📚 Books
        </button>
        <button 
          className={`category-tab ${selectedCategory === 'restaurants' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('restaurants')}
        >
          🍽️ Restaurants
        </button>
        <button 
          className={`category-tab ${selectedCategory === 'parks' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('parks')}
        >
          🏞️ Parks
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading recommendations...</div>
      ) : filteredRecs.length > 0 ? (
        <div className="recommendations-list">
          {filteredRecs.map(rec => (
            <div key={rec.id} className="recommendation-card">
              <div className="rec-header">
                <span className="rec-icon">{getCategoryIcon(rec.category)}</span>
                <h3>{rec.title}</h3>
              </div>
              {rec.description && <p className="rec-description">{rec.description}</p>}
              <div className="rec-footer">
                <span className="rec-date">
                  Added {new Date(rec.createdAt).toLocaleDateString()}
                </span>
                {rec.userId === currentUser.uid && (
                  <button 
                    onClick={() => handleDeleteRecommendation(rec.id, rec.userId)}
                    className="delete-rec-btn"
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recommendations">
          <p>No {selectedCategory} recommendations yet. Add your first one above!</p>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
