import React from "react";
import AnswerForm from "./AnswerForm";
import ComentaryInPost from "./ComentaryInPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import persona5 from "../../images/persona5.jpg";
import paisaje from "../../images/paisaje1.jpg";
function AllPost() {
  return (
    <div className="col main-content">
      <div className="all_post">
        {/* <!-- publicaciones sin fotos --> */}
        <div className="row">
          <div className="col-auto photo">
            <a href="#/">
              <img src={persona5} alt="" />
            </a>
          </div>
          <div className="col-10">
            <div className="onePost">
              <a href="/#" className="name">
                Andréa Brétéché
              </a>
              <p className="text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam quam quas qui mollitia harum libero aperiam cumque
                delectus odio accusantium magni, blanditiis omnis ipsum sint
                sapiente, saepe, animi deleniti consectetur.
              </p>
              <div className="imagen">
                <img src={paisaje} alt="" />
              </div>
            </div>

            <div className="caja-botones d-flex justify-content-between align-items-center">
              <button>
                {" "}
                <FontAwesomeIcon icon={faThumbsUp} />{" "}
              </button>
              <p>
                15 <FontAwesomeIcon icon={faThumbsUp} />
              </p>
            </div>

            <div className="comentarios">
              <AnswerForm />
              <ComentaryInPost />
              <ComentaryInPost />
              <ComentaryInPost />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default AllPost;
