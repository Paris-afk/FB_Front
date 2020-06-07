import React from "react";
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

function LeftSidebar() {
  return (
    <div className="col-md-3 left-sidebar" id="left-sidebar">
      <nav>
        <a href="/#">
          <FontAwesomeIcon icon={faUser} />
          <nbsp /> Friends
        </a>
        <a href="/#">
          <FontAwesomeIcon icon={faEnvelope} />
          <nbsp /> Private Messages
        </a>
        <a href="/#">
          <FontAwesomeIcon icon={faThumbsUp} />
          <nbsp /> Pages
        </a>
        <a href="/#">
          <FontAwesomeIcon icon={faPlay} />
          <nbsp /> Videos
        </a>
        <a href="/#">
          <FontAwesomeIcon icon={faCamera} />
          <nbsp /> Photos
        </a>
        <a href="/#">
          <FontAwesomeIcon icon={faMusic} />
          <nbsp /> Music
        </a>
        <a href="/#">
          <FontAwesomeIcon icon={faBookOpen} />
          <nbsp /> Books
        </a>
      </nav>
    </div>
  );
}

export default LeftSidebar;
