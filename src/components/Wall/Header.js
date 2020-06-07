import React from "react";
import "../../css/wall/style.css";
import persona2 from "../../images/persona2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faComment,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div>
      <header>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-12 col-md-6 col-lg-6 buscar order-2 order-md-1 mb-2 mb-md-0 ml-4 ml-md-0">
              <form action="">
                <div className="row no-gutters">
                  <div className="col-8">
                    <input type="text" placeholder="Search" />
                  </div>

                  <div className="col-4s">
                    <button>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <nav className="col-12 col-md-5 col-lg-4 menu d-flex justify-content-between ml-30 mt-auto order-1 order-md-2 mb-2 mb-md-0 mr-md-2">
              <a href="/#" className="imagen">
                <img
                  src={persona2}
                  alt=""
                  width="22"
                  height="22"
                  style={{ width: "22px", height: "22px" }}
                />
              </a>
              <a href="/#" className="menu-letras">
                Start
              </a>
              <a className="menu-letras" href="/#">
                Create
              </a>
              <a className="menu-icons" href="/#">
                <FontAwesomeIcon icon={faUser} />
              </a>

              <a className="menu-icons" href="/#">
                <FontAwesomeIcon icon={faComment} />
              </a>

              <a className="menu-icons" href="/#">
                <FontAwesomeIcon icon={faBell} />
              </a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
