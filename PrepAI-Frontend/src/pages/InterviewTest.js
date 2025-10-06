import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InterviewTest = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#09090b',
      color: '#edecf0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1>Interview Page Test</h1>
      <p>Session ID: {sessionId || 'new'}</p>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{
          background: '#bef264',
          color: '#09090b',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default InterviewTest;