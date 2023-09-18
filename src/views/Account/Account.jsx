import React, { useContext, useEffect, useState } from 'react';
import styles from "./Account.module.css";
import AccountHeader from '../../components/AccountHeader/AccountHeader';
import { useInView } from 'react-intersection-observer';
import { GlobalContext } from '../../context/globalContext';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { contactPreference } from '../../features/user/userSlice';
import { TailSpin } from 'react-loader-spinner';



const Account = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.user);
  const { user, message, userOrders } = state;

  const handleLogout = () =>{
    setLogged(false);
    navigate("/home");
  };

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency, setLogged } = globalContext;

  const [fixSections, setFixSections] = useState(false);
  const [scrollTopLight, setScrollTopLight] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);

  const { ref: refHeader, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });

  const { ref: refFooter, inView: footerInView, entry: footerEntry } = useInView({
    /* Optional options */
    threshold: 0.2,
  });


  const { ref: refPoster, inView: posterInView, entry: posterEntry } = useInView({
    /* Optional options */
    threshold: 0.65,
  });

  useEffect(() => {
    if(user){
      if(typeof user.favorites === "string"){
        setUserFavorites(JSON.parse(user.favorites));
      }else if(!user.favorites){
        setUserFavorites([]);
      }else{
        setUserFavorites(user.favorites);
      }
    }
  }, [user]);

  useEffect(() => {
    if(inView){
      setFixSections(false);
    }else{
      setFixSections(true);
    }
  }, [inView]);

  useEffect(() => {
    if(footerInView){
      setScrollTopLight(true);
    }else{
      setScrollTopLight(false);
    }
  }, [footerInView]);

  useEffect(() => {
    if(posterInView){
      setShowScrollBtn(false);
    }else{
      setShowScrollBtn(true);
    }
  }, [posterInView]);

  return ( 
    <div className={styles.wrapper}>
      <AccountHeader refHeader={refHeader}/>
      <div className={`${styles.sections} ${fixSections && styles.fixed}`}>
        <div className={styles.logo}>
          <span>My</span>
          <h5>MIH</h5>
        </div>
        <div className={styles.section} style={{borderLeft:"1px solid #eae8e4", borderBottom:"2.5px solid #1f1f1f"}}>
          <span>Overview</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/profile")}>
          <span>My Profile</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/orders")}>
          <span>My Orders</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/wishlist")}>
          <span>My Wishlist</span>
        </div>
        <div className={styles.section}>
          <span>My Reviews</span>
        </div>
      </div>
      
      {/* SCROLL TO THE TOP BUTTON */}
      <div className={`${styles.scrollTop} ${showScrollBtn && styles.show}`}>
        <button className={scrollTopLight ? styles.light : ""} onClick={()=> window.scrollTo(0, 0)}>
          Back to the start
          <i className='bx bx-chevron-up'></i>
        </button>
      </div>

      <div className={styles.mainImg} style={{marginTop: fixSections ? "87.5px" : "0px"}} ref={refPoster}>
        <img src="/images/landing.png" alt="abc" />
      </div>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <h3>{`${user?.firstName[0]}${user?.lastName[0]}`}</h3>
        </div>
        <div className={styles.contentContainer}>
          <p>{user?.firstName + " " + user?.lastName}</p>
          <div className={styles.cardsTop}>
            <div className={styles.eachCard}>
              <h5>My Profile</h5>
              <p className={styles.loginCredential}>Email • {user?.email}</p>
              <div className={styles.contactPreferences}>
                <p>Contact preferences</p>  
                <div className={styles.contactPreferencesContainer}>
                  <div className={styles.eachContact} onClick={()=> dispatch(contactPreference({userId: user?.id, contactPreference: "Email"}))}>
                    <div className={styles.contactIcon}>
                      <i className='bx bx-envelope bx-md'></i>
                      <div className={styles.contactStatus}>
                        {
                          message === `Updating preference Email` ? (
                            <TailSpin
                              height="17"
                              width="17"
                              color="#4fa94d"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          ):(
                            user?.contactPreferences.includes("Email") ? (
                              <i className="fa-solid fa-check" style={{color: "#5eb35e"}}></i>
                            ):(
                              <i className="fa-solid fa-xmark" style={{color: "#d84848"}}></i>
                            )
                          )
                        }
                      </div>
                    </div>
                    <span>Email newsletter</span>
                  </div>
                  <div className={styles.eachContact} onClick={()=> dispatch(contactPreference({userId: user?.id, contactPreference: "Phone"}))}>
                    <div className={styles.contactIcon}>
                      <i className='bx bx-mobile-alt bx-md'></i>
                      <div className={styles.contactStatus}>
                        {
                          message === `Updating preference Phone` ? (
                            <TailSpin
                              height="17"
                              width="17"
                              color="#4fa94d"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          ):(
                            user?.contactPreferences.includes("Phone") ? (
                              <i className="fa-solid fa-check" style={{color: "#5eb35e"}}></i>
                            ):(
                              <i className="fa-solid fa-xmark" style={{color: "#d84848"}}></i>
                            )
                          )
                        }
                      </div>
                    </div>
                    <span>Phone</span>
                  </div>
                  <div className={styles.eachContact} onClick={()=> dispatch(contactPreference({userId: user?.id, contactPreference: "Chat"}))}>
                    <div className={styles.contactIcon}>
                      <i className='bx bx-chat bx-md'></i>
                      <div className={styles.contactStatus}>
                        {
                          message === `Updating preference Chat` ? (
                            <TailSpin
                              height="17"
                              width="17"
                              color="#4fa94d"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          ):(
                            user?.contactPreferences.includes("Chat") ? (
                              <i className="fa-solid fa-check" style={{color: "#5eb35e"}}></i>
                            ):(
                              <i className="fa-solid fa-xmark" style={{color: "#d84848"}}></i>
                            )
                          )
                        }
                      </div>
                    </div>
                    <span>Text Chat App</span>
                  </div>
                  <div className={styles.eachContact} onClick={()=> dispatch(contactPreference({userId: user?.id, contactPreference: "Mail"}))}>
                    <div className={styles.contactIcon}>
                      <i className='bx bx-mail-send bx-md'></i>
                      <div className={styles.contactStatus}>
                        {
                          message === `Updating preference Mail` ? (
                            <TailSpin
                              height="17"
                              width="17"
                              color="#4fa94d"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          ):(
                            user?.contactPreferences.includes("Mail") ? (
                              <i className="fa-solid fa-check" style={{color: "#5eb35e"}}></i>
                            ):(
                              <i className="fa-solid fa-xmark" style={{color: "#d84848"}}></i>
                            )
                          )
                        }
                      </div>
                    </div>
                    <span>Mail</span>
                  </div>
                </div>
              </div>
              <div className={styles.blackButton}>
                <button onClick={()=> navigate("/account/profile")}>Edit Profile</button>
              </div>
            </div>
            <div className={styles.eachCard}>
              <h5>My Orders</h5>
              <div className={styles.orders}>
                {
                  userOrders.length ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          userOrders.map(el => {
                            return(
                              <tr>
                                <td>{el.orderId}</td>
                                <td>{el.orderStatus}</td>
                                <td>23/05/2023</td>
                                <td>{el.items.length}</td>
                                <td>${el.totalPrice}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  ):(
                    <span>There are no current orders</span>
                  )
                }
              </div>
              <div className={styles.blackButton}>
                <button>View Orders</button>               
                {/* <button>Start Shopping</button> */}
              </div>
            </div>
          </div>
          <div className={styles.cardsBottom}>
            <div className={styles.eachCard}>
                <h5>My Wishlist</h5>
                <div className={`${styles.wishlist} ${userFavorites.length > 0 && styles.active}`}>
                    {
                      userFavorites.length ? (
                        userFavorites.map((el, index) =>{
                          return(
                            <div className={styles.wishlistItem} key={index}>
                              <div className={styles.wItemImg}>
                                <img src={el.images[0].images[0]} alt="abc" />
                              </div>
                              <div className={styles.wItemDetails}>
                                <span>{el.name}</span>
                                <span>{getPriceByCurrency(el.price)}</span>
                              </div>
                            </div>
                          )
                        })
                      ):(
                        <span>There are no current items</span>
                      )
                    }
                </div>
                <div className={styles.blackButton}>
                  <button onClick={()=> navigate("/account/wishlist")}>Edit Wishlist</button>
                </div>
              </div>
              <div className={styles.eachCard}>

              </div>
          </div>
          <div className={styles.signOff}>
             <button onClick={handleLogout}>
                Logout
                <i className='bx bx-log-out'></i>
             </button>
          </div>
        </div>
      </div>
      <Footer refFooter={refFooter}/>
    </div>
   );
}
 
export default Account;