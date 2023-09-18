import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Login.module.css";
import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google';
import { Translate } from 'react-auto-translate';
import { GITHUB_CLIENT_ID } from '../../../utils/utilities';
import { clearUserMessage, githubAuth, googleLoginSlice, loginUser } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../context/globalContext';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


const credentialsInitialState = {
  credential: "",
  password: ""
};

const LoginModal = () => {
  
  const refToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { message: userMessage, user } = state.user;

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { showLoginModal, setShowLoginModal, setLogged } = globalContext;


  // CREDENTIALS STATE & HANDLE
  const [credentials, setCredentials] = useState(credentialsInitialState)
  const handleCredentials = (e) =>{
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  // MANUAL LOGIN
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  const [showPassword, setShowPassword] = useState(false);

  // GITHUB LOGIN
  const githubLogin = () =>{
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user,user:email`);
  };

  useEffect(() => {
    // FOR GITHUB LOGIN
    const location = window.location.search;
    const extractCode = new URLSearchParams(location);
    const code = extractCode.get("code");
    if(code){
      dispatch(githubAuth(code));  
    }
  }, []);

  // GOOGLE LOGIN
  const [token, setToken] = useState(null);
  
  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => setToken(tokenResponse.access_token),
  });

  useEffect(() => {
    // FOR GOOGLE LOGIN
    (async()=>{
      if(token){
        const getData = await axios("https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses", {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Accept":"application/json"
          }
        });

        // PETITION TO GOOGLE AUTH CONTROLLER IN THE BACK
        dispatch(googleLoginSlice({
          email: getData.data.emailAddresses[0].value,
          userName: getData.data.names[0].givenName,
          firstName: getData.data.names[0].givenName,
          lastName: getData.data.names[0].familyName
        }));

      }
    })()
  }, [token]);

  useEffect(() => {
    // GOOGLE AUTH RESPONSE
    if(userMessage === "Account already associated with Google Email"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: "There is an account associated with your Google email"});
      dispatch(clearUserMessage());
    };
    if(userMessage === "Google user logged"){  
          
      // Setear LS con userID encriptado
      if(user && user.encodedId){
        localStorage.setItem("nerdyUser", JSON.stringify({userId: user.encodedId}))
      };

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId
      })

      refToast.current.show({sticky: 2000, severity: "success", summary: "Welcome", detail: `Hi ${user?.userName}! It's good to see you!`});
      
      setTimeout(()=>{
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      },2100);
    };
    if(userMessage === "Google user created"){
      // Setear LS con userID encriptado
      // Setear LS con userID encriptado
      if(user && user.encodedId){
        localStorage.setItem("nerdyUser", JSON.stringify({userId: user.encodedId}))
      };
      
      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId
      })

      refToast.current.show({sticky: 2000, severity: "success", summary: "Welcome", detail: `It's a pleasure to have you with us ${user?.userName}!`});
      
      setTimeout(()=>{
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      },2100);
    };

    // GITHUB AUTH RESPONSE
    if(userMessage === "There is an account associated with your GitHub email, please try logging in manually!"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: userMessage});
      dispatch(clearUserMessage());
    }
    if(userMessage === "Github user logged"){  
          
      // Setear LS con userID encriptado
      if(user && user.encodedId){
        localStorage.setItem("nerdyUser", JSON.stringify({userId: user.encodedId}))
      };

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId
      })

      refToast.current.show({sticky: 2000, severity: "success", summary: "Welcome", detail: `Hi ${user?.userName}! It's good to see you!`});
      
      setTimeout(()=>{
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      },2100);
    };
    if(userMessage === "Github user created"){
      // Setear LS con userID encriptado
      // Setear LS con userID encriptado
      if(user && user.encodedId){
        localStorage.setItem("nerdyUser", JSON.stringify({userId: user.encodedId}))
      };
      
      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId
      })

      refToast.current.show({sticky: 2000, severity: "success", summary: "Welcome", detail: `It's a pleasure to have you with us ${user?.userName}!`});
      
      setTimeout(()=>{
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      },2100);
    };

    // LOGIN MANUALLY RESPONSE
    if(userMessage === "This email is associated with a Google account, please try logging in with Google"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: userMessage});
      dispatch(clearUserMessage());
    };
    if(userMessage === "This email is associated with a GitHub account, please try logging in with GitHub"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: userMessage});
      dispatch(clearUserMessage());
    };
    if(userMessage === "Email Incorrect"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: "We couldn't find any account associated with that email"});
      dispatch(clearUserMessage());
    };
    if(userMessage === "Username Incorrect"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: "We couldn't find any account associated with that username"});
      dispatch(clearUserMessage());
    };
    if(userMessage === "Password Incorrect"){
      refToast.current.show({life: 3000, severity: "info", summary: "We're sorry", detail: userMessage});
      dispatch(clearUserMessage());
    };
    if(userMessage === "User logged"){  
          
      // Setear LS con userID encriptado
      if(user && user.encodedId){
        localStorage.setItem("nerdyUser", JSON.stringify({userId: user.encodedId}))
      };

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId
      })

      refToast.current.show({sticky: 2000, severity: "success", summary: "Welcome", detail: `Hi ${user?.userName}! It's good to see you!`});
      
      setTimeout(()=>{
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      },2100);
    };
  }, [userMessage, user]);

  return ( 
    <article className={`${styles.article} loginModalUtil`} style={{right: showLoginModal ? "0" : "-1500px"}}>
      <Toast ref={refToast} position='top-left'></Toast>
      <div className={styles.div}>
        <div className={styles.container}>

          {/* LOGIN */}
          <div className={styles.login}>
            <div className='d-flex align-items-end justify-content-end w-100'>
              <div className={styles.close}>
                <i className='bx bx-x' onClick={()=> setShowLoginModal(false)}></i>
              </div>
            </div>

            {/* <h6>I already have an account</h6> */}

            {/* Login Options */}
            <div className={styles.loginOptions}>
              {/* Manual Login */}
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.loginInput}>
                  <span><Translate>Email or Username</Translate></span>
                  <input type="text" name='credential' onChange={handleCredentials} value={credentials.credential} />
                </div>
                <div className={`${styles.loginInput} mt-3`}>
                  <span><Translate>Password</Translate></span>
                  <div className='position-relative'>
                    <input type={`${showPassword ? "text" : "password"}`} name='password' onChange={handleCredentials} value={credentials.password} />
                    <div className={styles.showPassword}>
                      {
                        !showPassword ? <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye" onClick={()=> setShowPassword(!showPassword)}></i>
                      }
                    </div>
                  </div>
                </div>

                <span className={styles.forgotPassword}><Translate>Forgot your password?</Translate></span>

                <button type='submit' className={`${styles.loginButton} d-flex align-items-center justify-content-center`}>
                  {
                    userMessage === "Logging in user" ? (
                      <TailSpin
                        height="20"
                        width="20"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    ):(
                      <Translate>Log in</Translate>
                    )
                  }
                </button>
              </form>

              {/* Or */}
              <div className={styles.or}>
                <span></span>
                <span className={styles.orSpan}><Translate>Or</Translate></span>
                <span></span>
              </div>

              {/* Socials */}
              <div className={styles.loginButtons}>
                <button className={styles.googleLogin} onClick={googleLogin}>
                  <img src="/images/googleLogo.svg" alt="abc" width={20}/>
                  <span><Translate>Login with Google</Translate></span>
                </button>
                <button className={styles.githubLogin} onClick={githubLogin}>
                  <i className="fa-brands fa-github" style={{color: "#fff", fontSize:"22px"}}></i>
                  <span><Translate>Login with GitHub</Translate></span>
                </button>
                <button className={styles.fbLogin}>
                  <i className="fa-brands fa-facebook" style={{color: "white", fontSize:"22px"}}></i>
                  <span><Translate>Login with Facebook</Translate></span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.register}>
            <h6><Translate>I do not have an account</Translate></h6>
            <span className={styles.benefits}><Translate>Enjoy additional benefits and a more intense experience by creating a personal account.</Translate></span>
            <button className={styles.createAccount} onClick={()=> navigate("/signUp")}><Translate>Create an account</Translate></button>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default LoginModal;