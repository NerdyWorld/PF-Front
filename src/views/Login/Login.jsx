import React, { useContext, useEffect, useState } from "react";
import { FB_APP_ID, GITHUB_CLIENT_ID } from "../../utils/utilities";
import { useDispatch } from "react-redux";
import { githubAuth } from "../../features/user/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Translate } from "react-auto-translate";
import { GlobalContext } from "../../context/globalContext";

const Login = () => {
  const dispatch = useDispatch();
  const context = useContext(GlobalContext);
  const { setLanguage } = context;

  const [token, setToken] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
  });

  const githubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user,user:email`
    );
  };

  const handleLanguage = (language) => {
    setLanguage(language);
  };

  useEffect(() => {
    // FOR GOOGLE LOGIN
    (async () => {
      if (token) {
        const getData = await axios(
          "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        console.log(getData);
      }
    })();
  }, [token]);

  useEffect(() => {
    // FOR GITHUB LOGIN
    const location = window.location.search;
    const extractCode = new URLSearchParams(location);
    const code = extractCode.get("code");
    if (code) {
      dispatch(githubAuth(code));
    }
  }, []);

  return (
    <div className="login-landing modalLog">
      <div className="login">
        <h3 className="loginTitle">Login</h3>
        <button className="github containerLogin" onClick={githubLogin}>
        <img className="imgGoogle loginGoogle" src="/images/github.svg" alt="Github"/>
        </button>
        <button className='github containerLogin' onClick={githubLogin}>
          <img className="imgGoogle loginGoogle" src="/images/google.svg" alt="Google" />
        </button>
      </div>
    </div>
  );
};

export default Login;
