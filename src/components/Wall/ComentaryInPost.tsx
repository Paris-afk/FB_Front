import * as React from "react";
import persona1 from "../../images/persona1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function ComentaryInPost() {
  const [likes, setLikes] = React.useState(15);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  return (
    <div className="row g-0 comentario">
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
          <button 
            onClick={handleLike}
            className={`like-button-comment ${isLiked ? 'liked' : ''}`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
            {likes}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComentaryInPost;
