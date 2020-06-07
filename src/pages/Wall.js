import React from "react";
import Header from "../components/Wall/Header";
import MyPost from "../components/Wall/MyPost";
import AllPost from "../components/Wall/AllPost";
import LeftSidebar from "../components/Wall/LeftSidebar";
import RightSideBar from "../components/Wall/RightSideBar";
function Wall() {
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
          </div>
          <RightSideBar />
        </div>
      </main>
    </div>
  );
}

export default Wall;
