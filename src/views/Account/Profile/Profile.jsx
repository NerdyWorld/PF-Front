import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Profile.module.css";
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import FixSections from '../../../components/FixSections/FixSections';
import { useInView } from 'react-intersection-observer';
import { Translate } from 'react-auto-translate';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { GlobalContext } from '../../../context/globalContext';
import { useNavigate } from 'react-router';
import PasswordModal from '../../../components/Modals/Password/Password';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserMessage, updateUser } from '../../../features/user/userSlice';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { TailSpin } from 'react-loader-spinner';


const Profile = () => {
 
  // FIXED SECTIONS
  const [fixSections, setFixSections] = useState(false);

  const { ref: refHeader, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });

  useEffect(() => {
    if(inView){
      setFixSections(false);
    }else{
      setFixSections(true);
    }
  }, [inView]);


  const refToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.user);
  const { user, message } = state;
  const [openPassword, setOpenPassword] = useState(false);


  const saveInformation = (e) =>{
    e.preventDefault();
    dispatch(updateUser({userId: user?.id, newUser: personalInformation}));
  };

  const handleOpenPassword = () =>{
    if(!user.googleUser || !user.githubUser){
      setOpenPassword(true);
    }else if(user.googleUser){
      refToast.current.show({life: 3000, severity: "info", summary: `We're sorry!`, detail: `Google users can't change their password`});
    }else if(user.githubUser){
      refToast.current.show({life: 3000, severity: "info", summary: `We're sorry!`, detail: `Github users can't change their password`});
    }
  };


  // PERSONAL INFORMATION
  const [personalInformation, setPersonalInformation] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    genre:"",
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


  useEffect(() => {
    if(user){
      setPersonalInformation({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        genre: user.genre === "Not specified" ? "" : user.genre,
        birthday: user.birthday === "000" ? "" : new Date(user.birthday).toString()
      })
    }
  }, [user]);


  useEffect(() => {
    if(message === "Username already in use"){
      refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: `That username is already in use`});
      setTimeout(()=>{
        return dispatch(clearUserMessage());
      },3100)
    };
    if(message === "User updated"){
      setOpenPassword(false);
      refToast.current.show({life: 3000, severity: "success", summary: `Done!`, detail: `Your information has been updated`});
      setTimeout(()=>{
        return dispatch(clearUserMessage());
      },3100)
    }
  }, [message]);

  return ( 
    <div className={`createAccount ${styles.wrapper}`}>
      <Toast ref={refToast} position='top-left'></Toast>
      <AccountHeader refHeader={refHeader}/>
      {
        openPassword && <PasswordModal message={message} refToast={refToast} user={user} setOpenPassword={setOpenPassword}/>
      }
      {/* SECTIONS */}
      <div className={`${styles.sections} ${fixSections && styles.fixed}`}>
        <div className={styles.logo}>
          <span>My</span>
          <h5>MIH</h5>
        </div>
        <div className={styles.section} style={{borderLeft:"1px solid #eae8e4"}} onClick={()=> navigate("/account")}>
          <span>Overview</span>
        </div>
        <div className={styles.section} style={{borderBottom:"2.5px solid #1f1f1f"}}>
          <span>My Profile</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/orders")}>
          <span>My Orders</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/wishlist")}>
          <span>My Wishlist</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/reviews")}>
          <span>My Reviews</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content} style={{marginTop: fixSections ? "87.5px" : "0px"}}>
        <h2 className={styles.title}>My Profile</h2>
        <div className={styles.container}>
          <div className={styles.left}>
            <h2 className={styles.subTitle}>Personal Information</h2>
            <div className={styles.leftContainer}>
              <form onSubmit={saveInformation}>
                {/* <div className={styles.requiredFields}>
                  <span>Required Fields *</span>
                </div> */}

                {/* USER NAME */}
                <div className={styles.loginInput}>
                  <span><Translate>Username *</Translate></span>
                  <div className='position-relative'>
                    <input type="text" name='userName' onChange={handlePersonalInformation} value={personalInformation.userName} />
                    <div className={styles.validEmail} style={{opacity: personalInformation.userName?.length > 3 ? "1" : "0"}}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                  </div>
                </div>

                {/* FIRST NAME */}
                <div className={styles.loginInput}>
                  <span><Translate>First Name *</Translate></span>
                  <div className='position-relative'>
                    <input type="text" name='firstName' onChange={handlePersonalInformation} value={personalInformation.firstName} />
                    <div className={styles.validEmail} style={{opacity: personalInformation.firstName?.length > 0 ? "1" : "0"}}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                  </div>
                </div>

                {/* LAST NAME */}
                <div className={styles.loginInput}>
                  <span><Translate>Last Name *</Translate></span>
                  <div className='position-relative'>
                    <input type="text" name='lastName' onChange={handlePersonalInformation} value={personalInformation.lastName} />
                    <div className={styles.validEmail} style={{opacity: personalInformation.lastName?.length > 0 ? "1" : "0"}}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                  </div>
                </div>

                {/* GENRE */}
                <div className={`${styles.loginInputGenre} ${styles.loginInput}`}>
                  <span><Translate>Genre *</Translate></span>
                  <div className='position-relative'>
                  <Dropdown value={{name: personalInformation.genre, code: personalInformation.genre}} onChange={(e) => setPersonalInformation({...personalInformation, genre: e.value.name})} optionLabel='name' options={genreSource} className='w-100' />
                    
                  </div>
                </div>

                {/* BIRTHDAY */}
                <div className={`birthday ${styles.loginInput}`}>
                  <span><Translate>Birth date *</Translate></span>
                  <Calendar placeholder={new Date(user?.birthday).toLocaleDateString()} value={personalInformation.birthday} onChange={(e) => setPersonalInformation({...personalInformation, birthday: e.value})} />
                </div>

                <div className={styles.blackButton}>
                  <button className='d-flex align-items-center justify-content-center'>
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
                        "Save Information"
                      )
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.subTitle}>Login Information</h2>
            <div className={styles.rightContainer}>
              <div className={styles.loginInput}>
                <span><Translate>Email</Translate></span>
                <div className='position-relative'>
                  <input type="text" disabled name='email' value={user?.email} />
                  
                </div>
              </div>
              <div className={styles.password}>
                <span className='d-flex align-items-center gap-1'>Password <i className='bx bxs-lock-alt'></i></span>
                <button onClick={handleOpenPassword}>Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Profile;