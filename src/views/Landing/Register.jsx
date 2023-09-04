import React, { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const navigate = useNavigate();
  
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const repeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <section>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="card-login p-md-4">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="form-outline">
                <input
                  type="text"
                  id="form3Example1m"
                  className="form-control"
                />
                <label className="form-label" for="form3Example1m">
                  First name
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-outline">
                <input
                  type="text"
                  id="form3Example1n"
                  className="form-control"
                />
                <label className="form-label" for="form3Example1n">
                  Last name
                </label>
              </div>
            </div>
          </div>          
          <div className="row">
            <div className="col-md-6">
              <div className="form-outline">
              <input
                type={showPassword ? "text" : "password"}
                id="form3Example4c"
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example4c">
                Password
              </label>
              {showPassword ? (
                <MdVisibilityOff
                  className="password-icon"
                  onClick={passwordVisibility}
                />
              ) : (
                <MdVisibility
                  className="password-icon"
                  onClick={passwordVisibility}
                />
              )}
            </div>
            </div>          
            <div className="col-md-6">
              <div className="form-outline">
              <input
                 type={showRepeatPassword ? "text" : "password"}
                id="password-input"
                className="form-control"
              />
              <label className="form-label" for="form3Example4cd">
                Repeat your password
              </label>
              {showRepeatPassword ? (
                <MdVisibilityOff
                  className="password-icon"
                  onClick={repeatPasswordVisibility}
                />
              ) : (
                <MdVisibility
                  className="password-icon"
                  onClick={repeatPasswordVisibility}
                />
              )}
            </div>
          </div>
          </div>
          <div className="form-outline mb-4">
            <input type="text" id="email" className="form-control" />
            <label className="form-label" for="email">
              Email
            </label>
          </div>
          <div className="form-check d-flex justify-content-center mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="suscription"
              checked={isSubscribed}
              onChange={() => setIsSubscribed(!isSubscribed)}
            />
            <label className="form-check-label" for="suscription">
              Subscribe to our newsletter
            </label>
          </div>
          <div className="container-btn d-flex justify-content-center pt-8">
            
            <button onClick={() => navigate("home")} type="button" className="btn-landing">
              Create Account
            </button>
          </div>
          <div className="text-center">
            <p>Or sign up with:</p>
            <div className="boxLog">
              <button className="github container-login">
                <img
                  className="imgGoogle loginGoogle"
                  src="/images/github.svg"
                  alt="Github"
                />
              </button>
              <button className="github container-login">
                <img
                  className="imgGoogle loginGoogle"
                  src="/images/google.svg"
                  alt="Google"
                />
              </button>
              <button className="github container-login">
                <img
                  className="imgGoogle loginGoogle"
                  src="/images/fb.svg"
                  alt="Google"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
