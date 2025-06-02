import * as React from "react";
import MyPost from "../components/Wall/MyPost";
import AllPost from "../components/Wall/AllPost";
import { PostRepository } from "../repositories/PostRepository";
import "../css/bootstrap5-fixes.css";

const Wall: React.FC = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const postRepo = PostRepository.getInstance();
  const currentUser = postRepo.getCurrentUser();

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <MyPost currentUser={currentUser} onPostCreated={handlePostCreated} />
      <AllPost key={refreshKey} />
    </>
  );
};

export default Wall;
