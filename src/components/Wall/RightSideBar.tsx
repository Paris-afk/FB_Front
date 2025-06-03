import * as React from "react";
import { faker } from "@faker-js/faker";
import { NavLink } from "react-router-dom";

function getRandomAds() {
  return [
    faker.image.urlPicsumPhotos({ width: 300, height: 180 }),
    faker.image.urlPicsumPhotos({ width: 300, height: 180 }),
  ];
}

function RightSideBar() {
  const [ads] = React.useState(() => getRandomAds());
  return (
    <div className="col-3 right-sidebar d-none d-lg-block">
      <h3>Publicité</h3>
      <div className="adds">
        <a href="/publicity">
          <img
            src={ads[0]}
            width="300px"
            alt="publicité1"
            style={{ borderRadius: 10, marginBottom: 12 }}
          />
        </a>
      </div>
      <div className="adds">
        <a href="/publicity">
          <img
            src={ads[1]}
            width="300px"
            alt="publicité2"
            style={{ borderRadius: 10, marginBottom: 12 }}
          />
        </a>
      </div>
      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginTop: 16,
        }}
      >
        <NavLink to="/privacity">Confidentialité</NavLink>
        <NavLink to="/about-us">À propos</NavLink>
        <NavLink to="/publicity">Publicité</NavLink>
        <NavLink to="/settings">Paramètres</NavLink>
      </footer>
    </div>
  );
}

export default RightSideBar;
