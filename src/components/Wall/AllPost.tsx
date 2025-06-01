import * as React from "react";
import AnswerForm from "./AnswerForm";
import CommentInPost from "./CommentInPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { usePosts } from "../../hooks/usePosts";
import { PostModel } from "../../models/Post";

function AllPost() {
  const { posts, currentUser, loading, error, toggleLike, addComment, toggleCommentLike } = usePosts();

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="alert alert-warning" role="alert">
        No user found
      </div>
    );
  }

  const handleLike = (postId: string) => {
    toggleLike(postId);
  };

  const handleAddComment = (postId: string, content: string) => {
    if (content.trim()) {
      addComment(postId, content);
    }
  };

  const handleToggleCommentLike = (postId: string, commentId: string) => {
    toggleCommentLike(postId, commentId);
  };

  return (
    <div className="main-content">
      {posts.map((post: PostModel) => (
        <div key={post.id} className="all_post">
          <div className="row">
            <div className="col-auto photo">
              <a href="#/">
                <img src={post.author.avatar} alt={post.author.fullName} />
              </a>
            </div>
            <div className="col-10">
              <div className="onePost">
                <div className="d-flex align-items-center mb-3">
                  <a href="/#" className="name me-2">
                    {post.author.fullName}
                  </a>
                  <small className="text-muted">{post.getTimeAgo()}</small>
                </div>
                <p className="text">
                  {post.content}
                </p>
                {post.hasMedia() && post.imageUrl && (
                  <div className="image">
                    <img src={post.imageUrl} alt="Post content" />
                  </div>
                )}
              </div>

              <div className="action-buttons d-flex justify-content-start align-items-center gap-3">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`like-button ${post.isLikedBy('current-user') ? 'liked' : ''}`}
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
                  {post.getLikesCount()} Like{post.getLikesCount() !== 1 ? 's' : ''}
                </button>
                
                <button className="comment-button">
                  <FontAwesomeIcon icon={faComment} className="me-1" />
                  {post.getCommentsCount()} Comment{post.getCommentsCount() !== 1 ? 's' : ''}
                </button>
                
                <button className="share-button">
                  <FontAwesomeIcon icon={faShare} className="me-1" />
                  {post.shares} Share{post.shares !== 1 ? 's' : ''}
                </button>
              </div>

              <div className="comments">
                <AnswerForm 
                  onSubmit={(content) => handleAddComment(post.id, content)}
                  currentUser={currentUser}
                />
                {post.comments.map((comment) => (
                  <CommentInPost 
                    key={comment.id} 
                    comment={comment}
                    currentUser={currentUser}
                    onToggleLike={(commentId) => handleToggleCommentLike(post.id, commentId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllPost;
