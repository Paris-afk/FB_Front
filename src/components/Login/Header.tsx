import * as React from "react";
import "../../css/login/style.css";
import facebook_logo from "../../images/facebook-logo.png";

interface HeaderProps {
  onLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <header>
      <div className="header-block">
        <div className="logo">
          <img src={facebook_logo} alt="facebookLogo" className="fb-logo" />
        </div>
        <div className="facebook-login">
          <div className="email">
            <label>Email or Phone</label>
            <br />
            <input type="text" name="email" />
          </div>
          <div className="password">
            <label>password</label>
            <br />
            <input type="password" name="password" /> <br />
            <button type="button" style={{background: 'none', border: 'none', color: '#1877f2', textDecoration: 'underline', cursor: 'pointer'}}>
              Forgotten account?
            </button>
          </div>
          <form onSubmit={handleLogin}>
            <div className="login-button">
              <input type="submit" value="Log in" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
