import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UpgradeBanner from './components/UpgradeBanner';
import Login from './components/Login';
import MyGoals from './components/MyGoals';
import Feed from './components/Feed';
import FindUsers from './components/FindUsers';
import UserProfile from './components/UserProfile';
import MyRecommendations from './components/MyRecommendations';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import AIAssistant from './components/AIAssistant';
import LocalNews from './components/LocalNews';
import FunSpots from './components/FunSpots';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

// Owner-Only Protected Route
const OwnerRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser.email !== 'shainaqureshi@gmail.com') return <Navigate to="/my-goals" />;
  return children;
};

// Main App Component
const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      {currentUser && <Navbar />}
      {currentUser && <UpgradeBanner />}
      {currentUser && <AIAssistant />}
      <Routes>
        <Route path="/login" element={
          currentUser ? <Navigate to="/my-goals" /> : <Login />
        } />
        <Route path="/my-goals" element={
          <ProtectedRoute>
            <MyGoals />
          </ProtectedRoute>
        } />
        <Route path="/feed" element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        } />
        <Route path="/find-users" element={
          <OwnerRoute>
            <FindUsers />
          </OwnerRoute>
        } />
        <Route path="/recommendations" element={
          <ProtectedRoute>
            <MyRecommendations />
          </ProtectedRoute>
        } />
        <Route path="/local-news" element={
          <ProtectedRoute>
            <LocalNews />
          </ProtectedRoute>
        } />
        <Route path="/fun-spots" element={
          <ProtectedRoute>
            <FunSpots />
          </ProtectedRoute>
        } />
        <Route path="/user/:userId" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={
          <Navigate to={currentUser ? "/my-goals" : "/login"} />
        } />
      </Routes>
      <Footer />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
