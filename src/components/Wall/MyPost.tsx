import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFileImage } from "@fortawesome/free-solid-svg-icons";
import persona2 from "../../images/persona2.jpg";
import "../../css/wall/style.css";
import "../../css/responsive.css";
import AllPost from "./AllPost";

function MyPost() {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    const sidebar = document.getElementById('left-sidebar');
    if (sidebar) {
      if (sidebarVisible) {
        sidebar.classList.remove('show');
      } else {
        sidebar.classList.add('show');
      }
    }
  };

  return (
    <div className="post">
      <div className="row">
        <div className="col">
          <button
            className="btn-menu d-md-none d-flex justify-content-between"
            onClick={toggleSidebar}
          >
            <span>Menu</span>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-auto photo">
          <a href="/#">
            <img src={persona2} alt="" />
          </a>
        </div>

        <div className="col">
          <form action="">
            <textarea name="" id="" placeholder="say something"></textarea>

            <div className="contenedor-botones d-flex justify-content-between">
              <div className="media">
                <a href="/#">
                  <FontAwesomeIcon icon={faFileImage} />
                </a>
              </div>

              <div>
                <button>Publicar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr></hr>

    </div>
  );
}

export default MyPost;
