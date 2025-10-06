import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import InterviewTest from './pages/InterviewTest';
import History from './pages/History';


const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Don't show navbar on dashboard and other authenticated pages
  const showNavbar = !user && !['/dashboard', '/interviews', '/progress', '/history', '/speaking-practice', '/english-practice'].includes(location.pathname) && !location.pathname.startsWith('/interview/');

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interviews" element={<Dashboard />} />
        <Route path="/progress" element={<Dashboard />} />
        <Route path="/interview/new" element={<Interview />} />
        <Route path="/interview/:sessionId" element={<Interview />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
