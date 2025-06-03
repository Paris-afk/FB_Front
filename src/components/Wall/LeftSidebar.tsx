import * as React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faThumbsUp,
  faPlay,
  faCamera,
  faMusic,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const LeftSidebar: React.FC = () => {
  return (
    <div className="col-md-3 left-sidebar" id="left-sidebar">
      <nav>
        <NavLink
          to="/friends"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faUser} />
          &nbsp; Friends
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faEnvelope} />
          &nbsp; Messages privés
        </NavLink>
        <NavLink
          to="/pages"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          &nbsp; Pages
        </NavLink>
        <NavLink
          to="/videos"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faPlay} />
          &nbsp; Vidéos
        </NavLink>
        <NavLink
          to="/photos"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faCamera} />
          &nbsp; Photos
        </NavLink>
        <NavLink
          to="/music"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faMusic} />
          &nbsp; Musique
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 8,
          }}
        >
          <FontAwesomeIcon icon={faBookOpen} />
          &nbsp; Books
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftSidebar;
