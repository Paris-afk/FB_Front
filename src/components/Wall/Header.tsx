import * as React from "react";
import { NavLink } from "react-router-dom";
import "../../css/wall/style.css";
import "../../css/bootstrap5-fixes.css";
import "../../css/responsive.css";
import persona2 from "../../images/persona2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faComment,
  faBell,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <div>
      <header>
        <div className="container">
          <div className="row g-0">
            <div className="col-12 col-md-6 col-lg-6 buscar order-2 order-md-1 mb-2 mb-md-0 ms-4 ms-md-0">
              <form action="">
                <div className="row g-0">
                  <div className="col-9">
                    <input type="text" placeholder="Search Facebook" />
                  </div>

                  <div className="col-3">
                    <button type="button">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <nav className="col-12 col-md-5 col-lg-4 menu d-flex justify-content-between ms-30 mt-auto order-1 order-md-2 mb-2 mb-md-0 me-md-2 ms-md-3">
              <NavLink to="/wall" className="imagen">
                <img
                  src={persona2}
                  alt="Profile"
                  width="28"
                  height="28"
                  style={{ width: "28px", height: "28px" }}
                />
              </NavLink>
              <NavLink to="/wall" className="menu-letras">
                Home
              </NavLink>
              <NavLink className="menu-letras" to="/pages">
                Create
              </NavLink>
              <NavLink className="menu-icons" to="/friends" title="Friends">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>

              <NavLink className="menu-icons" to="/messages" title="Messages">
                <FontAwesomeIcon icon={faComment} />
              </NavLink>

              <NavLink className="menu-icons" to="/wall" title="Notifications">
                <FontAwesomeIcon icon={faBell} />
              </NavLink>

              <button
                onClick={onLogout}
                className="logout-button"
                title="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
