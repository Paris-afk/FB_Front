import * as React from "react";
import persona2 from "../../images/persona2.jpg";
function AnswerForm() {
  return (
    <div>
      <div className="row g-0 comentario">
        <div className="col-auto photo">
          <a href="/#">
            <img src={persona2} alt="" />
          </a>
        </div>
        <div className="col">
          <form action="">
            <textarea name="" id="" placeholder="comentary"></textarea>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnswerForm;
