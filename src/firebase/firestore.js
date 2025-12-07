import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

// Goal categories
export const GOAL_CATEGORIES = {
  INTELLECTUAL: 'intellectual',
  EMOTIONAL: 'emotional',
  SOCIAL: 'social',
  PHYSICAL: 'physical'
};

// Create a new goal
export const createGoal = async (userId, goalData) => {
  try {
    const goalsRef = collection(db, 'goals');
    const newGoal = {
      ...goalData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(goalsRef, newGoal);
    return docRef.id;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
};

// Update a goal
export const updateGoal = async (goalId, goalData) => {
  try {
    const goalRef = doc(db, 'goals', goalId);
    await updateDoc(goalRef, {
      ...goalData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
};

// Delete a goal
export const deleteGoal = async (goalId) => {
  try {
    const goalRef = doc(db, 'goals', goalId);
    await deleteDoc(goalRef);
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
};

// Get user's goals
export const getUserGoals = async (userId) => {
  try {
    const goalsRef = collection(db, 'goals');
    const q = query(goalsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const goals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Sort by createdAt in memory
    return goals.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error getting user goals:", error);
    throw error;
  }
};

// Get all public goals for the feed
export const getPublicGoals = async () => {
  try {
    const goalsRef = collection(db, 'goals');
    const q = query(goalsRef, where('isPublic', '==', true));
    const querySnapshot = await getDocs(q);
    const goals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Sort by createdAt in memory
    return goals.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error getting public goals:", error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// Create or update user profile
export const createOrUpdateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = {
      ...userData,
      userId,
      updatedAt: serverTimestamp()
    };
    
    // Use setDoc with merge option to create or update
    await setDoc(userRef, userDoc, { merge: true });
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Upload photo for a goal
export const uploadGoalPhoto = async (goalId, userId, file) => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `goals/${userId}/${goalId}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, filename);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return {
      url: downloadURL,
      path: filename,
      uploadedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};

// Delete photo from storage
export const deleteGoalPhoto = async (photoPath) => {
  try {
    const photoRef = ref(storage, photoPath);
    await deleteObject(photoRef);
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
};

// Add photo to goal
export const addPhotoToGoal = async (goalId, photoData) => {
  try {
    const goalRef = doc(db, 'goals', goalId);
    await updateDoc(goalRef, {
      photos: photoData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding photo to goal:", error);
    throw error;
  }
};
