import * as React from "react";
import Header from "../components/Wall/Header";
import MyPost from "../components/Wall/MyPost";
import AllPost from "../components/Wall/AllPost";
import LeftSidebar from "../components/Wall/LeftSidebar";
import RightSideBar from "../components/Wall/RightSideBar";

const Wall: React.FC = () => {
  return (
    <div>
      <header>
        <Header />
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
