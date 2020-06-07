import React from "react";

function RightSideBar() {
  return (
    <div className="col-3 right-sidebar d-none d-lg-block">
      <h3>Publicity</h3>
      <div className="adds">
        <a href="/#">
          <img
            src="https://www.sciencesetavenir.fr/assets/img/2018/09/27/cover-r4x3w1000-5baca90227563-emmanuel-macron.jpg"
            width="300px"
            alt=""
          />
        </a>
      </div>

      <div className="adds">
        <a href="/#">
          <img
            src="http://www.info-gamers.com/wp-content/uploads/2019/09/violencia-gaming.jpg"
            width="300px"
            alt=""
          />
        </a>
      </div>
      <div className="adds">
        <a href="/#">
          <img
            src="http://www.leparisien.fr/resizer/n4lELZ-xPMq_eAYg1JOVeRPUuNY=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/VTDAM3GMMX4PTNNXQB5NCQEMD4.jpg"
            width="300px"
            alt=""
          />
        </a>
      </div>

      <footer>
        <a href="/#">Privacity</a>
        <a href="/#">About us</a>
        <a href="/#">Publicity</a>
        <a href="/#">Settings</a>
      </footer>
    </div>
  );
}

export default RightSideBar;
