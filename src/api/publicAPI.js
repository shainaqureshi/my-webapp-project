import { db } from '../firebase/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

/**
 * Public API endpoints for AI and external access
 * These functions provide structured data about the app
 */

// Get public statistics about the app
export const getPublicStats = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const goalsSnapshot = await getDocs(collection(db, 'goals'));
    const recsSnapshot = await getDocs(collection(db, 'recommendations'));
    
    return {
      totalUsers: usersSnapshot.size,
      totalGoals: goalsSnapshot.size,
      totalRecommendations: recsSnapshot.size,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};

// Get public recommendations (without user info)
export const getPublicRecommendations = async (category = null, limitCount = 50) => {
  try {
    const recsRef = collection(db, 'recommendations');
    const q = query(recsRef, limit(limitCount));
    const snapshot = await getDocs(q);
    
    const recommendations = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      createdAt: doc.data().createdAt
    }));
    
    // Filter by category if specified
    if (category) {
      return recommendations.filter(rec => rec.category === category);
    }
    
    return recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

// Get public goals feed (without personal info)
export const getPublicGoalsFeed = async (limitCount = 50) => {
  try {
    const goalsRef = collection(db, 'goals');
    const q = query(goalsRef, limit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      points: doc.data().points || 0,
      streak: doc.data().streak || 0,
      createdAt: doc.data().createdAt
    }));
  } catch (error) {
    console.error('Error fetching goals:', error);
    return [];
  }
};

// Get app capabilities for AI understanding
export const getAppCapabilities = () => {
  return {
    name: "Share Your Goals",
    version: "1.0.0",
    description: "A kid-friendly goal tracking and community sharing application",
    targetAudience: "Children ages 8-12",
    features: [
      {
        name: "Goal Tracking",
        description: "Users can create, track, and complete personal goals",
        capabilities: ["Create goals", "Mark as complete", "Earn points", "Track streaks"]
      },
      {
        name: "Points System",
        description: "Gamification through points for completing goals",
        capabilities: ["Earn points per completion", "View total points", "Leaderboard (coming soon)"]
      },
      {
        name: "Community Feed",
        description: "See goals from other users in the community",
        capabilities: ["Browse public goals", "See popular goals", "Get inspired"]
      },
      {
        name: "Recommendations",
        description: "Anonymous community recommendations for books, restaurants, and parks",
        capabilities: ["Add recommendations", "Browse by category", "Filter by type"]
      },
      {
        name: "Authentication",
        description: "Google sign-in or guest mode",
        capabilities: ["Google OAuth", "Anonymous guest accounts", "Upgrade guest to permanent"]
      }
    ],
    technologies: ["React", "Firebase", "Firestore", "Firebase Authentication"],
    privacy: "COPPA compliant, child-directed, non-personalized ads only",
    monetization: "Google AdSense with child-directed treatment"
  };
};
