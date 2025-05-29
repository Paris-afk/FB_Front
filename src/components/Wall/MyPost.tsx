import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFileImage } from "@fortawesome/free-solid-svg-icons";
import persona2 from "../../images/persona2.jpg";
import "../../css/wall/style.css";
import AllPost from "./AllPost";
function MyPost() {
  return (
    <div className="post">
      <div className="row">
        <div className="col">
          <a
            href="/#"
            className="btn-menu d-md-none d-flex justify-content-between"
            id="btn-menu "
          >
            <span>Menu</span>
            <FontAwesomeIcon icon={faBars} />
          </a>
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
      <AllPost />
    </div>
  );
}

export default MyPost;
