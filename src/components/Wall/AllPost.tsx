import * as React from "react";
import AnswerForm from "./AnswerForm";
import ComentaryInPost from "./ComentaryInPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import persona5 from "../../images/persona5.jpg";
import paisaje from "../../images/paisaje1.jpg";

function AllPost() {
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
            <div className="d-flex align-items-center mb-3">
              <a href="/#" className="name me-2">
                Andréa Brétéché
              </a>
              <small className="text-muted">2 hours ago</small>
            </div>
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

          <div className="caja-botones d-flex justify-content-start align-items-center">
            <button 
              onClick={handleLike}
              className={`like-button ${isLiked ? 'liked' : ''}`}
            >
              <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
              {likes} Like{likes !== 1 ? 's' : ''}
            </button>
          </div>

          <div className="comentarios">
            <AnswerForm />
            <ComentaryInPost />
            <ComentaryInPost />
            <ComentaryInPost />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPost;
