import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/responsive.css';
import Login from './pages/Login';
import Wall from './pages/Wall';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Pages from './pages/Pages';
import Videos from './pages/Videos';
import './App.css';
import Header from './components/Wall/Header';
import LeftSidebar from './components/Wall/LeftSidebar';
import RightSideBar from './components/Wall/RightSideBar';

// Persist auth state in localStorage for refreshes
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('fb_logged_in') === 'true';
  });
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('fb_logged_in', 'true');
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('fb_logged_in');
  };
  return { isLoggedIn, login, logout };
}

const MainLayout: React.FC<{ children: React.ReactNode, onLogout: () => void }> = ({ children, onLogout }) => (
  <div>
    <header>
      <Header onLogout={onLogout} />
    </header>
    <main className="container">
      <div className="row">
        <LeftSidebar />
        <div className="col main-content">{children}</div>
        <RightSideBar />
      </div>
    </main>
  </div>
);

const AppRoutes: React.FC<{ isLoggedIn: boolean, login: () => void, logout: () => void }> = ({ isLoggedIn, login, logout }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={login} />} />
      <Route
        path="/wall"
        element={
          isLoggedIn ? (
            <MainLayout onLogout={logout}>
              <Wall />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/friends"
        element={
          isLoggedIn ? (
            <MainLayout onLogout={logout}>
              <Friends />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/messages"
        element={
          isLoggedIn ? (
            <MainLayout onLogout={logout}>
              <Messages />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/pages"
        element={
          isLoggedIn ? (
            <MainLayout onLogout={logout}>
              <Pages />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/videos"
        element={
          isLoggedIn ? (
            <MainLayout onLogout={logout}>
              <Videos />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/wall" : "/login"} replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();
  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} login={login} logout={logout} />
    </Router>
  );
};

export default App;
