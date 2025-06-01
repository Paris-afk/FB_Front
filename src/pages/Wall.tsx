import * as React from "react";
import Header from "../components/Wall/Header";
import MyPost from "../components/Wall/MyPost";
import AllPost from "../components/Wall/AllPost";
import LeftSidebar from "../components/Wall/LeftSidebar";
import RightSideBar from "../components/Wall/RightSideBar";
import { PostRepository } from "../repositories/PostRepository";
import "../css/bootstrap5-fixes.css";

interface WallProps {
  onLogout?: () => void;
}

const Wall: React.FC<WallProps> = ({ onLogout }) => {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const postRepo = PostRepository.getInstance();
  const currentUser = postRepo.getCurrentUser();

  const handlePostCreated = () => {
    // Trigger a refresh of the AllPost component
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <header>
        <Header onLogout={onLogout} />
      </header>

      <main className="container">
        <div className="row">
          <LeftSidebar />
          <div className="col main-content">
            <MyPost currentUser={currentUser} onPostCreated={handlePostCreated} />
            <AllPost key={refreshKey} />
          </div>
          <RightSideBar />
        </div>
      </main>
    </div>
  );
};

export default Wall;
