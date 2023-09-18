import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./SignUp.module.css";
import { Translate } from 'react-auto-translate';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import uniqId from "uniqid";
import { useDispatch, useSelector } from 'react-redux';
import { clearUserMessage, createUser, sendActivationCode, validateCredentials } from '../../features/user/userSlice';
import { TailSpin } from 'react-loader-spinner';
import { GlobalContext } from '../../context/globalContext';



const SignUp = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { language, setLanguage, setLogged } = globalContext;

  
  // TOAST REF
  const refToast = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { message, user } = state.user;

  const [section1, setSection1] = useState(true);
  const [section2, setSection2] = useState(false);
  const [section3, setSection3] = useState(false);


  // ACTIVATE ACCOUNT
  const [activationCode, setActivationCode] = useState("");
  const [userActivationCode, setUserActivationCode] = useState("");
  const [codeResent, setCodeResent] = useState(false);


  const handleActivationCode = (e) =>{
    setUserActivationCode(e.target.value);
  }

  const sendCodeAgain = () =>{
    // SEND CODE AGAIN
    const newCode = uniqId();
    setActivationCode(newCode);
    setCodeResent(true);
    dispatch(sendActivationCode({
      email: emails.email1,
      firstName: personalInformation.firstName,
      activationCode: newCode
    }))
    setTimeout(()=>{
      setCodeResent(false);
    },10000)
  };

  const activateAccount = () =>{
    if(activationCode === userActivationCode){
      // Create account
      dispatch(createUser({
        ...personalInformation,
        userName: username,
        email: emails.email1,
        password: passwords.password1,
        avatar
      }));

    }else{
      return refToast.current.show({life: 4000, severity: "error", summary: "Ups!", detail: `Invalid activation code`});
    }
  };



  // NEXT SECTION
  const handleNextSection = (e) =>{
    e.preventDefault();

    if(section1){
      if(!emails.email1.length || !emails.email2.length || !username.length){
        // Toast
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Please complete all fields to continue`});

      }else if(username.length < 3){
        // Toast
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Your username must be longer than 3 characters`});
    
      }else if(!email1ValidFormat || !email2ValidFormat){
        // Toast
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Please provide a valid email format`});
        
      }else if(emails.email1 !== emails.email2){
        // Toast
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Please make sure your emails match`});

      }else if(email1ValidFormat && email2ValidFormat && (emails.email1 === emails.email2) && username.length > 3){
        dispatch(validateCredentials({
          email: emails.email1,
          username
        }))
      }
    };

    if(section2){
      console.log(personalInformation);
      if(!passwords.password1.length){
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Password can't be empty`});
      }
      if(passwords.password1 !== passwords.password2){
        console.log(passwords);
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Please make sure your passwords match`});
      };
      if(!validPassword1){
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Please make sure your password meets all requirements`});
      };
      if(!personalInformation.firstName || !personalInformation.lastName || !personalInformation.genre || !personalInformation.birthday){
        return refToast.current.show({life: 2000, severity: "warn", summary: "Wait", detail: `Please check if your personal information is complete`});
      };
      if(validPassword1 && (passwords.password1 === passwords.password2) && personalInformation.firstName && personalInformation.lastName && personalInformation.genre && personalInformation.birthday){
        setSection1(false);
        setSection2(false);
        setSection3(true);
        const myActivationCode = uniqId();
        setActivationCode(myActivationCode);
        dispatch(sendActivationCode({
          email: emails.email1,
          firstName: personalInformation.firstName,
          activationCode: myActivationCode
        }))
      };
    }
  };

  const handleGoBack = () =>{
    if(section1){
      navigate("/home")
    };
    if(section2){
      setSection1(true);
      setSection2(false);
      setSection3(false);
    }
    if(section3){
      setSection1(false);
      setSection2(true);
      setSection3(false);
    }
  }

  useEffect(() => {
    if(message === "Credentials available"){
      setSection1(false);
      setSection2(true);
      setSection3(false);
      dispatch(clearUserMessage())
    };

    if(message === "Username in use"){
      return refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: `That username is already in use`});
    };
    if(message === "Email in use"){
      return refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: `That email is already in use`});
    };
    if(message === "Email in use with Google"){
      return refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: `That email is already associated with a Google account`});
    };
    if(message === "Email in use with Github"){
      return refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: `That email is already associated with a Github account`});
    };

    if(message === "User created"){
      // Setear LS con userID encriptado
      if(user && user.encodedId){
        localStorage.setItem("nerdyUser", JSON.stringify({userId: user.encodedId}))
      };

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId
      })
      refToast.current.show({life: 2000, severity: "success", summary: `Welcome ${username}`, detail: `It's a pleasure to have you with us!`});
      setTimeout(()=>{
        dispatch(clearUserMessage());
        navigate("/myRivelle")
      }, 2500)
    }
  }, [message]);


  // USERNAME
  const [username, setUsername] = useState("");

  // AVATAR
  const [avatar, setAvatar] = useState("/images/signup1.svg");

  // EMAIL VALIDATION
  const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [emails, setEmails] = useState({
    email1: "",
    email2: ""
  });

  const [email1ValidFormat, setEmail1ValidFormat] = useState(true);
  const [email2ValidFormat, setEmail2ValidFormat] = useState(true);


  const handleEmail = (e) =>{
    setEmails({
      ...emails,

      [e.target.name]: e.target.value
    })
  };

  useEffect(() => {
    if(emails.email1.match(emailValidRegex)){
      setEmail1ValidFormat(true)
    }else{
      setEmail1ValidFormat(false);
    };

    if(emails.email2.match(emailValidRegex)){
      setEmail2ValidFormat(true);
    }else{
      setEmail2ValidFormat(false);
    };

  }, [emails, emailValidRegex]);




  // PASSWORD VALDIDATION

  const refPasswordGuide = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const validPassword =  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  const passSpecialCharacters = /^(?=.*[!@#$%^&*])/;
  const passLowerCaseLetters = /^(?=.*[a-z])/;
  const passUpperCaseLetters = /^(?=.*[A-Z])/;
  const passNumber = /^(?=.*[0-9])/;

  const [passwords, setPasswords] = useState({
    password1: "",
    password2: ""
  });

  const [passSpecialCharactersState, setPassSpecialCharactersState] = useState(false);
  const [passLowerCaseLettersState, setPassLowerCaseLettersState] = useState(false);
  const [passUpperCaseLettersState, setPassUpperCaseLettersState] = useState(false);
  const [passNumberState, setPassNumberState] = useState(false);
  const [passLengthState, setPassLengthState] = useState(false);

  const [validPassword1, setValidPassword1] = useState(false);
  const [validPassword2, setValidPassword2] = useState(false);

  const handlePassword = (e) =>{
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    })
  }
 

  useEffect(() => {
    // PASSWORD COMPLETE MATCH
    if(validPassword.test(passwords.password1)){
      setValidPassword1(true);
    }else{
      setValidPassword1(false);
    };

    // EACH REGEX
    if(passSpecialCharacters.test(passwords.password1)){
      setPassSpecialCharactersState(true);
    }else{
      setPassSpecialCharactersState(false);
    };

    if(passLowerCaseLetters.test(passwords.password1)){
      setPassLowerCaseLettersState(true);
    }else{
      setPassLowerCaseLettersState(false);
    };

    if(passUpperCaseLetters.test(passwords.password1)){
      setPassUpperCaseLettersState(true);
    }else{
      setPassUpperCaseLettersState(false);
    };

    if(passNumber.test(passwords.password1)){
      setPassNumberState(true);
    }else{
      setPassNumberState(false);
    };

    if(passwords.password1.length > 8){
      setPassLengthState(true);
    }else{
      setPassLengthState(false);
    };


    // IF PASSWORD 1 MATCH WITH 2
    if(passwords.password1 === passwords.password2){
      // Next section
    }else{
      // Toast
    }

    
  }, [passwords]);


  // SHOW PASSWORD GUIDE
  const showPasswordGuide = () =>{
    refPasswordGuide.current.style.display = "flex"
  };

  const hidePasswordGuide = () =>{
    refPasswordGuide.current.style.display = "none"

  };



  // PERSONAL INFORMATION
  const [personalInformation, setPersonalInformation] = useState({
    firstName: "",
    lastName: "",
    genre: "",
    birthday: ""
  });

  const handlePersonalInformation = (e) =>{
    setPersonalInformation({
      ...personalInformation,
      [e.target.name]: e.target.value
    })
  };

  // GENRE DROPDOWN
  const genreSource = [
    { name: 'Male', code: 'Male' },
    { name: 'Female', code: 'Female' }
  ];

  // DATE
  const [originalDate, setOriginalDate] = useState("");



  return ( 
    <div className={`${styles.wrapper} createAccount`}>
     <Toast ref={refToast} position='top-left'></Toast>
      <div className={styles.header}>
        <h5>Made in Heaven</h5>
        <span>Create Account</span>
      </div>
      
      {/* GO BACK BUTTON */}
      <div className={styles.goBack} onClick={handleGoBack}>
        <div className={styles.svg}>
          <svg version="1.1" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                  <g fill="#19110B">
                      <polygon id="Fill-1" points="62.6420585 23 57.9060461 27.8669755 66.9114544 36.6308297 0 37.5436907 0.0921591929 44.3343681 67.1015934 43.4195669 58.225208 52.5423569 63.087333 57.2725487 80 39.8913249" transform="translate(40.000000, 40.136274) scale(-1, 1) translate(-40.000000, -40.136274) ">
                      </polygon>
                  </g>
              </g>
          </svg>
        </div>
      </div> 
      

      {/* SECTIONS */}
      <div className={styles.content}>
        
        {
          section1 &&
          <div className={styles.section1}>
            <div className={styles.section1Content}>
              <span className={styles.createTitle}>Create a New Account</span>
              <form className={styles.form} onSubmit={(e)=> e.preventDefault()}>
                <h2 className={styles.formTitle}>Login Information (1/3)</h2>
                <div className={styles.section1Information}>
                <div className={styles.loginInput}>
                    <span><Translate>Username *</Translate></span>
                    <div className='position-relative'>
                      <input type="text" name='username' onChange={(e)=> setUsername(e.target.value)} value={username} />
                      <div className={styles.validEmail} style={{opacity: username.length > 3 ? "1" : "0"}}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </div>
                  </div>
                  <div className={styles.loginInput}>
                    <span><Translate>Email *</Translate></span>
                    <div className='position-relative'>
                      <input type="text" name='email1' placeholder='name@example.com' onChange={handleEmail} value={emails.email1} />
                      <div className={styles.validEmail} style={{opacity: email1ValidFormat ? "1" : "0"}}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </div>
                  </div>
                  <div className={styles.loginInput}>
                    <span><Translate>Confirm Email *</Translate></span>
                    <div className='position-relative'>
                      <input type="text" name='email2' placeholder='name@example.com' onChange={handleEmail} value={emails.email2} />
                      <div className={styles.validEmail} style={{opacity: email2ValidFormat ? "1" : "0"}}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <h2 className={styles.formTitle} style={{marginTop: "1rem"}}>Avatar</h2>
              
              {/* IMAGES */}
              <div className={styles.avatarContainer}>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup1.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup1.svg" alt="abc" onClick={()=> setAvatar("/images/signup1.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup2.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup2.svg" alt="abc" onClick={()=> setAvatar("/images/signup2.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup3.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup3.svg" alt="abc" onClick={()=> setAvatar("/images/signup3.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup4.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup4.svg" alt="abc" onClick={()=> setAvatar("/images/signup4.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup5.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup5.svg" alt="abc" onClick={()=> setAvatar("/images/signup5.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup6.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup6.svg" alt="abc" onClick={()=> setAvatar("/images/signup6.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup7.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup7.svg" alt="abc" onClick={()=> setAvatar("/images/signup7.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup8.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup8.svg" alt="abc" onClick={()=> setAvatar("/images/signup8.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup9.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup9.svg" alt="abc" onClick={()=> setAvatar("/images/signup9.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup10.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup10.svg" alt="abc" onClick={()=> setAvatar("/images/signup10.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup11.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup11.svg" alt="abc" onClick={()=> setAvatar("/images/signup11.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup12.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup12.svg" alt="abc" onClick={()=> setAvatar("/images/signup12.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup13.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup13.svg" alt="abc" onClick={()=> setAvatar("/images/signup13.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup14.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup14.svg" alt="abc" onClick={()=> setAvatar("/images/signup14.svg")} />
                  </div>
                  <div className={`${styles.avatarImg} ${avatar === "/images/signup15.svg" && styles.avatarSelected}`}>
                    <img src="/images/signup15.svg" alt="abc" onClick={()=> setAvatar("/images/signup15.svg")} />
                  </div>
              </div>
              {/* NEXT BUTTON */}
              <div className={styles.nextButton} style={{marginTop: "3rem"}} onClick={handleNextSection}>
                <button className='d-flex align-items-center justify-content-center'>
                  {
                    message === "Validating credentials" ? (
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
                      "Next"
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        }

        {
          section2 &&
          <div className={styles.section1}>
            <div className={styles.section1Content}>
              <span className={styles.createTitle}>Create a New Account</span>
              <form className={styles.form} onSubmit={handleNextSection}>
                <h2 className={styles.formTitle}>Login Information (2/3)</h2>
                <div className={styles.section1Information}>
                  <div className={styles.loginInput}>
                    <span><Translate>Password *</Translate></span>
                    <div className='position-relative'>
                      <input type={`${showPassword ? "text" : "password"}`} onFocus={showPasswordGuide} onBlur={hidePasswordGuide} name='password1' onChange={handlePassword} value={passwords.password1} />
                      <div className={styles.seePassword}>
                        {
                          showPassword ? <i className="fa-solid fa-eye" onClick={()=> setShowPassword(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword(true)}></i>
                        }
                      </div>
                    </div>
                  </div>
                  {/* PASSWORD GUIDE */}
                  <div className={styles.passwordGuide} ref={refPasswordGuide}>
                      <p>Your password must contain:</p>
                      <span>
                        {
                          passLengthState ? (
                            <i className="fa-solid fa-2xs fa-circle-check" style={{color: "#469246"}}></i>
                            ):(
                            <i className="fa-regular fa-2xs fa-circle"></i>
                          )
                        }
                        At least 8 characters
                      </span>
                      <span>
                        {
                          passNumberState ? (
                            <i className="fa-solid fa-2xs fa-circle-check" style={{color: "#469246"}}></i>
                            
                            ):(
                            <i className="fa-regular fa-2xs fa-circle"></i>
                          )
                        }
                        At least 1 number
                      </span>
                      <span>
                        {
                          passUpperCaseLettersState ? (
                            <i className="fa-solid fa-2xs fa-circle-check" style={{color: "#469246"}}></i>
                            
                            ):(
                            <i className="fa-regular fa-2xs fa-circle"></i>
                          )
                        }
                        At least 1 capital letter
                      </span>
                      <span>
                        {
                          passLowerCaseLettersState ? (
                            <i className="fa-solid fa-2xs fa-circle-check" style={{color: "#469246"}}></i>
                            
                            ):(
                            <i className="fa-regular fa-2xs fa-circle"></i>
                          )
                        }
                        At least 1 lowercase letter
                      </span>
                      <span>
                        {
                          passSpecialCharactersState ? (
                            <i className="fa-solid fa-2xs fa-circle-check" style={{color: "#469246"}}></i>
                            
                            ):(
                            <i className="fa-regular fa-2xs fa-circle"></i>
                          )
                        }
                        At least 1 following special character <span className={styles.specialCharacters}>! @ # $ % ^ & *</span>
                      </span>
                  </div>

                  <div className={styles.loginInput}>
                    <span><Translate>Confirm Password *</Translate></span>
                    <div className='position-relative'>
                      <input readOnly={validPassword1 ? false : true} type={`${showPassword2 ? "text" : "password"}`} name='password2' onChange={handlePassword} value={passwords.password2} />
                      <div className={styles.seePassword}>
                        {
                          showPassword2 ? <i className="fa-solid fa-eye" onClick={()=> setShowPassword2(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword2(true)}></i>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <form className={styles.form} onSubmit={handleNextSection}>
                <h2 className={styles.formTitle}>Personal Information</h2>
                <div className={styles.section1Information}>
                    <div className={styles.loginInput}>
                      <span><Translate>First Name *</Translate></span>
                      <div className='position-relative'>
                        <input type="text" name='firstName' onChange={handlePersonalInformation} value={personalInformation.firstName} />
                        <div className={styles.validEmail} style={{opacity: personalInformation.firstName.length ? "1" : "0"}}>
                          <i className="fa-solid fa-check"></i>
                        </div>
                      </div>
                    </div>
                    <div className={styles.loginInput}>
                      <span><Translate>Last Name *</Translate></span>
                      <div className='position-relative'>
                        <input type="text" name='lastName' onChange={handlePersonalInformation} value={personalInformation.lastName} />
                        <div className={styles.validEmail} style={{opacity: personalInformation.lastName.length ? "1" : "0"}}>
                          <i className="fa-solid fa-check"></i>
                        </div>
                      </div>
                    </div>
                    <div className={styles.loginInput}>
                      <span><Translate>Genre *</Translate></span>
                      <div className='position-relative'>
                      <Dropdown value={{name: personalInformation.genre, code: personalInformation.genre}} onChange={(e) => setPersonalInformation({...personalInformation, genre: e.value.name})} optionLabel='name' options={genreSource} className='w-100' />
                        {/* <input type="text" name='genre' onChange={handlePersonalInformation} value={personalInformation.genre} />
                        <div className={styles.validEmail} style={{opacity: personalInformation.genre.length ? "1" : "0"}}>
                          <i className="fa-solid fa-check"></i>
                        </div> */}
                      </div>
                    </div>
                    <div className={`birthday ${styles.loginInput}`}>
                      <span><Translate>Birth date *</Translate></span>
                      <Calendar value={originalDate} onChange={(e) => {setPersonalInformation({...personalInformation, birthday: e.value})}} />
                    </div>
                </div>
              </form>
              
              <div className={styles.nextButton} onClick={handleNextSection}>
                <button>Next</button>
              </div>
            </div>
          </div>
        }

        {
          section3 &&
          <div className={styles.section1}>
            <div className={styles.section1Content}>
              <span className={styles.createTitle}>Create a New Account</span>
              <form className={styles.form} onSubmit={(e)=> e.preventDefault()}>
                <h2 className={styles.formTitle}>Activate Account</h2>
                <div className={styles.section1Information}>
                  <p className={styles.activateP}>
                    Please enter the activation code you just received by email at <span>{emails.email1}</span> to activate your account.
                  </p>
                  <div className={styles.loginInput}>
                    <span><Translate>Activation Code *</Translate></span>
                    <div>
                      <input type="text" placeholder='ex: 12345' onChange={handleActivationCode} value={userActivationCode} />
                    </div>
                  </div>
                  <div className={`${styles.sendAgain} ${codeResent && styles.codeResent}`} onClick={sendCodeAgain}>
                    <span>Send Again</span>
                  </div>
                  <div className={styles.newCodeSent} style={{display: codeResent ? "block" : "none"}}>
                    <span>A new code has been sent to you</span>
                  </div>
                </div>
              </form>
              <div className={styles.activateButton} onClick={activateAccount}>
                <button className='d-flex align-items-center justify-content-center'>
                  {
                    message === "Creating user" ? (
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
                      "Activate Account"
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        }

        {/* WHAT YOU'LL FIND SECTION */}
        <div className={styles.fixedSection}>
          <div className={styles.adviceContainer}>
            <div className={styles.advice}>
              <h2 >What you'll find in your MIH account</h2>
              <div className={styles.adviceItem} style={{paddingBottom:"1rem"}}>
                <i className='bx bx-credit-card'></i>
                <span>Manage your personal information</span>
              </div>
              <div className={styles.adviceItem} style={{borderTop: "1px solid #eae8e4", padding: "1rem 0rem"}}>
                <i className='bx bx-shopping-bag' ></i>
                <span>Access your order history</span>
              </div>
              <div className={styles.adviceItem} style={{borderTop: "1px solid #eae8e4", padding: "1rem 0rem"}}>
                <i className='bx bx-heart'></i>
                <span>Register your wishlist</span>
              </div>
              <div className={styles.adviceItem} style={{borderTop: "1px solid #eae8e4", paddingTop: "1rem"}}>
                <i className='bx bx-envelope'></i>
                <span>Receive Made in Heaven's digital communications</span>
              </div>
            </div>
            <div className={styles.callUs}>
              <h2>Call Us</h2>
              <div className={styles.callUsItem}>
                <svg viewBox="0 0 80 80" focusable="false" aria-hidden="true" class="ui-icon-controls-contact"><path d="M46.8 9.4H33.6a2.9 2.9 0 0 0 0 5.9h13.2a2.9 2.9 0 1 0 0-5.9zm0 54.1H33.6a2.9 2.9 0 0 0 0 5.9h13.2a2.9 2.9 0 1 0 0-5.9zM54.2 0a10.9 10.9 0 0 1 10.9 10.8v58.4A10.9 10.9 0 0 1 54.2 80H25.8a10.9 10.9 0 0 1-10.9-10.8V10.8A10.9 10.9 0 0 1 25.8 0zm5 10.8v58.4a5 5 0 0 1-5 5H25.8a5 5 0 0 1-5-5V10.8a5 5 0 0 1 5-5h28.4a5 5 0 0 1 5 5" fill-rule="evenodd"></path></svg>
                <a href="tel:+1786300300">{"+1 (786) 300300"}</a>
              </div>
              <div className={styles.callUsItem}>
                <i className='bx bx-envelope'></i>
                <a href="mailto: madeinheaven@gmail.com" className={styles.mailLink}>madeinheaven@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.footer}>
          <h5>Made in Heaven</h5>
          <div className={styles.languageContainer}>
            <div className={styles.world}>
              <i className='bx bx-world'></i>
            </div>
            <div className={styles.languages}>
              <div onClick={()=> setLanguage("en")} className={styles.language} style={{borderLeft: "1px solid white", paddingLeft: "0.8rem"}}>
                <span className={language === "en" && styles.chosenLanguage}>EN</span>
              </div>
              <div onClick={()=> setLanguage("es")} className={styles.language}>
                <span className={language === "es" && styles.chosenLanguage}>ES</span>
              </div>
              <div onClick={()=> setLanguage("fr")} className={styles.language}>
                <span className={language === "fr" && styles.chosenLanguage}>FR</span>
              </div>
              <div onClick={()=> setLanguage("it")} className={styles.language}>
                <span className={language === "it" && styles.chosenLanguage}>IT</span>
              </div>
              <div onClick={()=> setLanguage("de")} className={styles.language}>
                <span className={language === "de" && styles.chosenLanguage}>DE</span>
              </div>
              <div onClick={()=> setLanguage("pt")} className={styles.language}>
                <span className={language === "pt" && styles.chosenLanguage}>PT</span>
              </div>
            </div>
          </div>
      </div>
    </div>
   );
}
 
export default SignUp;