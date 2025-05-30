import * as React from "react";
import Header from "../components/Wall/Header";
import MyPost from "../components/Wall/MyPost";
import AllPost from "../components/Wall/AllPost";
import LeftSidebar from "../components/Wall/LeftSidebar";
import RightSideBar from "../components/Wall/RightSideBar";
import "../css/bootstrap5-fixes.css";

interface WallProps {
  onLogout?: () => void;
}

const Wall: React.FC<WallProps> = ({ onLogout }) => {
  return (
    <div>
      <header>
        <Header onLogout={onLogout} />
      </header>

      <main className="container">
        <div className="row">
          <LeftSidebar />
          <div className="col main-content">
            <MyPost />
            <AllPost />
          </div>
          <RightSideBar />
        </div>
      </main>
    </div>
  );
};

export default Wall;
