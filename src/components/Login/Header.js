import React from "react";
import "../../css/login/style.css";
import facebook_logo from "../../images/facebook-logo.png";
function Header() {
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
            <a href="#">Forgotten account?</a>
          </div>
          <form>
            <div className="login-button">
              <input type="submit" value="Log in" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
