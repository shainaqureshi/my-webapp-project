import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './FindUsers.css';

const FindUsers = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      // Filter out current user
      const filteredUsers = allUsers.filter(user => user.id !== currentUser?.uid);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const name = user.displayName || user.email || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="find-users">
      <div className="users-header">
        <h2>Find Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-users">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <div 
              key={user.id} 
              className="user-card"
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <div className="user-avatar">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} />
                ) : (
                  <div className="avatar-placeholder">
                    {(user.displayName || user.email || '?')[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.displayName || 'Anonymous'}</h3>
                <p className="user-email">{user.email}</p>
              </div>
              <div className="view-profile-hint">Click to view profile →</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindUsers;
