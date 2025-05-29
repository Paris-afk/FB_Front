import React, { useState } from 'react';
import Login from './pages/Login';
import Wall from './pages/Wall';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'wall'>('login');

  if (currentPage === 'wall') {
    return (
      <div className="App">
        <Wall />
        <button 
          onClick={() => setCurrentPage('login')}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '10px',
            background: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Login onLogin={() => setCurrentPage('wall')} />
      <button 
        onClick={() => setCurrentPage('wall')}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '10px',
          background: '#1877f2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go to Wall (Debug)
      </button>
    </div>
  );
}

export default App;
