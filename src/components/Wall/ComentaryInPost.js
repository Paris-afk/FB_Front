import React from "react";
import persona1 from "../../images/persona1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
function ComentaryInPost() {
  return (
    <div className="row no-gutters comentario">
      <div className="col-auto photo">
        <a href="/#">
          <img src={persona1} alt="" />
        </a>
      </div>
      <div className="col">
        <p className="respuesta">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi labore
          est modi laborum magni ab dolorum nulla voluptates culpa iusto,
          doloremque placeat itaque quidem iste assumenda ratione deserunt
          provident! Illum.
        </p>

        <div className="caja-botones-comentarios d-flex justify-content-start align-items-center">
          <button>
            15 <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComentaryInPost;
