import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../models/User";
import { PostRepository } from "../../repositories/PostRepository";
import "../../css/wall/style.css";
import "../../css/responsive.css";

interface MyPostProps {
  currentUser: User;
  onPostCreated?: () => void;
}

function MyPost({ currentUser, onPostCreated }: MyPostProps) {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [postContent, setPostContent] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const postRepo = PostRepository.getInstance();
      postRepo.createPost(postContent.trim());
      
      setPostContent("");
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
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
            <img src={currentUser.avatar} alt={currentUser.fullName} />
          </a>
        </div>

        <div className="col">
          <form onSubmit={handleSubmit}>
            <textarea 
              name="content" 
              id="content" 
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
              disabled={isSubmitting}
            />

            <div className="button-container d-flex justify-content-between">
              <div className="media">
                <a href="/#" onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={faFileImage} />
                </a>
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !postContent.trim()}
                >
                  {isSubmitting ? "Publishing..." : "Publish"}
                </button>
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
