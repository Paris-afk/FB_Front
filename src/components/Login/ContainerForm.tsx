import * as React from "react";

interface ContainerFormProps {
  onLogin?: () => void;
}

const ContainerForm: React.FC<ContainerFormProps> = ({ onLogin }) => {
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <div className="row">
          <div className="col-6 fb-social">
            <h2>Connect with friends and the</h2>
            <h2>world around you on Facebook</h2>

            <div className="fb-social-p">
              <p>
                <b>See photos and updates</b> from friends in News Feed
              </p>
              <p>
                <b>Share what's new</b> in your life on your Timelife
              </p>
              <p>
                <b>Find more</b> of what are you looking for with Facebook
                search
              </p>
            </div>
          </div>

          <div className="col-5 fb-form">
            <h2>Sign Up</h2>
            <h4>It's quick and easy</h4>

            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="text"
                className="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Mobile number or email"
              />
              <small id="helpId" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="text"
                className="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="New password"
              />
              <small id="helpId" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
              <label>
                <h5>Birthday</h5>
              </label>
              <input
                type="date"
                className="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
              <small id="helpId" className="form-text text-muted"></small>
            </div>
            <div className="row">
              <div className="col gender">
                <h5>Gender</h5>
                <input type="radio" name="val" id="" />
                Female
                <input type="radio" name="val" id="" />
                Male
                <input type="radio" name="val" id="" />
                Custom
              </div>
            </div>
            <p>il suffit d'appuyer sur le bouton</p>
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContainerForm;
