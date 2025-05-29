import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/responsive.css';
import Login from './pages/Login';
import Wall from './pages/Wall';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'wall'>('login');

  if (currentPage === 'wall') {
    return (
      <div className="App">
        <Wall onLogout={() => setCurrentPage('login')} />
      </div>
    );
  }

  return (
    <div className="App">
      <Login onLogin={() => setCurrentPage('wall')} />
    </div>
  );
}

export default App;
