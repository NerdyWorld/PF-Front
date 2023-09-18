import React, { useState, useEffect, useRef } from 'react';
import styles from "./Password.module.css";
import { Translate } from 'react-auto-translate';
import { updateUser } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';




const PasswordModal = ({user, setOpenPassword, refToast, message}) => {

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: ""
  });


  const handlePasswords = (e) =>{
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    })
  };


  const changePassword = () =>{
    if(!oldPassword.length || !passwords.password1.length || !passwords.password2.length){
      // TOAST
      return refToast.current.show({life: 3000, severity: "warn", summary: `Wait!`, detail: `Please complete all fields`});
    }else if(!validPassword1){
      // TOAST
      return refToast.current.show({life: 3000, severity: "warn", summary: `Wait!`, detail: `Make sure your password meets the safety requirements`});
    }else if(passwords.password1 !== passwords.password2){
      // TOAST
      return refToast.current.show({life: 3000, severity: "warn", summary: `Wait!`, detail: `Please make sure your passwords match`});
    }else{
      dispatch(updateUser({userId: user?.id, newUser: {password: passwords.password1}, oldPassword}));
    }
  };

  useEffect(() => {
    if(message === "Old password incorrect"){
      return refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: message});
    }
  }, [message]);


  // VALIDATION STATES


  const refPasswordGuide = useRef();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const validPassword =  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  const passSpecialCharacters = /^(?=.*[!@#$%^&*])/;
  const passLowerCaseLetters = /^(?=.*[a-z])/;
  const passUpperCaseLetters = /^(?=.*[A-Z])/;
  const passNumber = /^(?=.*[0-9])/;

  const [passSpecialCharactersState, setPassSpecialCharactersState] = useState(false);
  const [passLowerCaseLettersState, setPassLowerCaseLettersState] = useState(false);
  const [passUpperCaseLettersState, setPassUpperCaseLettersState] = useState(false);
  const [passNumberState, setPassNumberState] = useState(false);
  const [passLengthState, setPassLengthState] = useState(false);

  const [validPassword1, setValidPassword1] = useState(false);
  

  // SHOW PASSWORD GUIDE
  const showPasswordGuide = () =>{
    refPasswordGuide.current.style.display = "flex"
  };

  const hidePasswordGuide = () =>{
    refPasswordGuide.current.style.display = "none"

  };

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
    
  }, [passwords]);


  return ( 
    <article className={styles.article}>
      <div className={styles.div}>
        <div className={styles.close} onClick={()=> setOpenPassword(false)}>
          <i class='bx bx-x' ></i>
        </div>
        <h2 className={styles.subTitle}>Change Your Password</h2>
        <div className={styles.inputs}>
        <div className={styles.loginInput}>
          <span><Translate>Old Password *</Translate></span>
          <div className='position-relative'>
            <input type="text" name='oldPassword' onChange={(e)=> setOldPassword(e.target.value)} value={oldPassword}/>
            <div className={styles.seePassword}>
              {
                showPassword1 ? <i className="fa-solid fa-eye" onClick={()=> setShowPassword1(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword1(true)}></i>
              }
            </div>
          </div>
        </div>
        <div className={styles.loginInput}>
          <span><Translate>Password *</Translate></span>
          <div className='position-relative'>
            <input type="text" name='password1' onFocus={showPasswordGuide} onBlur={hidePasswordGuide} onChange={handlePasswords} value={passwords.password1}/>
            <div className={styles.validEmail} style={{opacity: validPassword1 ? "1" : "0"}}>
              <i className="fa-solid fa-check"></i>
            </div>
            <div className={styles.seePassword}>
              {
                showPassword2 ? <i className="fa-solid fa-eye" onClick={()=> setShowPassword2(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword2(true)}></i>
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
            <input type="text" name='password2' onChange={handlePasswords} value={passwords.password2}/>
            <div className={styles.validEmail} style={{opacity: (passwords.password1 === passwords.password2 && passwords.password1.length > 0 && passwords.password2.length > 0) ? "1" : "0"}}>
              <i className="fa-solid fa-check"></i>
            </div>
            <div className={styles.seePassword}>
              {
                showPassword3 ? <i className="fa-solid fa-eye" onClick={()=> setShowPassword3(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword3(true)}></i>
              }
            </div>
          </div>
        </div>
        <div className={styles.blackButton}>
          <button className='d-flex align-items-center justify-content-center' onClick={changePassword}>
          {
            message === "Updating user" ? (
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
              "Save Changes"
            )
          }
          </button>
        </div>
        </div>
      </div>
    </article>
   );
}
 
export default PasswordModal;