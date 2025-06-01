import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { CommentModel } from "../../models/Comment";
import { UserModel } from "../../models/User";

interface CommentInPostProps {
  comment: CommentModel;
  currentUser: UserModel;
  onToggleLike?: (commentId: string) => void;
}

function CommentInPost({ comment, currentUser, onToggleLike }: CommentInPostProps) {
  const isLiked = comment.isLikedBy(currentUser.id);
  const likesCount = comment.getLikesCount();

  const handleLike = () => {
    if (onToggleLike) {
      onToggleLike(comment.id);
    }
  };

  return (
    <div className="row g-0 comment">
      <div className="col-auto photo">
        <a href="/#">
          <img src={comment.author.avatar} alt={comment.author.fullName} />
        </a>
      </div>
      <div className="col">
        <div className="comment-header">
          <strong style={{ color: "black" }}>{comment.author.fullName}</strong>
          <span className="comment-time">{comment.getTimeAgo()}</span>
        </div>
        <p className="comment-content">
          {comment.content}
        </p>

        <div className="comment-actions d-flex justify-content-start align-items-center">
          <button 
            onClick={handleLike}
            className={`like-button-comment ${isLiked ? 'liked' : ''}`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
            {likesCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentInPost;
