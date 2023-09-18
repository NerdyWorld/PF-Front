import React, { useContext, useEffect, useState } from 'react';
import styles from "./Wishlist.module.css";
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import { useNavigate } from 'react-router';
import { useInView } from 'react-intersection-observer';
import WishlistCard from '../../../components/Utils/Wishlist/WishlistCard';
import { Translate } from 'react-auto-translate';
import { Dropdown } from 'primereact/dropdown';
import { GlobalContext } from '../../../context/globalContext';
import { useSelector } from 'react-redux';
import Footer from '../../../components/Footer/Footer';



const Wishlist = () => {

  const userState = useSelector(state => state.user);
  const { user } = userState;
  const [userFavorites, setUserFavorites] = useState([]);

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { sortByName, sortByPriceDecrease, sortByPriceIncrease } = globalContext;


  const navigate = useNavigate();
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


  // FILTER BY
  const [filterBy, setFilterBy] = useState("Date");
  const [sortedItems, setSortedItems] = useState([]);

  // GENRE DROPDOWN
  const filterSource = [
    { name: 'Date', code: 'Date' },
    { name: 'Name', code: 'Name' },
    { name: 'Price +', code: 'Price +' },
    { name: 'Price -', code: 'Price -' }
  ];

  useEffect(() => {
    if(userFavorites.length){
      if(filterBy === "Date"){
        let parsedState = [...userFavorites];

        return setSortedItems(parsedState);
      }
      if(filterBy === "Name"){
        let parsedState = [...userFavorites];

        return setSortedItems(parsedState.sort(sortByName));
      }
      if(filterBy === "Price +"){
        let parsedState = [...userFavorites];

        return setSortedItems(parsedState.sort(sortByPriceDecrease));
      };
      if(filterBy === "Price -"){
        let parsedState = [...userFavorites];

        return setSortedItems(parsedState.sort(sortByPriceIncrease));
      };
    }
  }, [filterBy, userFavorites]);
  
  useEffect(() => {
    if(user){
      if(typeof user.favorites === "string"){
        setUserFavorites(JSON.parse(user.favorites));
      }else if(!user.favorites){
        setUserFavorites([]);
      }else{
        setUserFavorites(user.favorites);
      };
    };
  }, [user]);

  return ( 
    <div className={`${styles.wrapper} createAccount`}>
      <AccountHeader refHeader={refHeader}/>
      {/* SECTIONS */}
      <div className={`${styles.sections} ${fixSections && styles.fixed}`}>
        <div className={styles.logo}>
          <span>My</span>
          <h5>MIH</h5>
        </div>
        <div className={styles.section} style={{borderLeft:"1px solid #eae8e4"}} onClick={()=> navigate("/account")}>
          <span>Overview</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/profile")}>
          <span>My Profile</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/orders")}>
          <span>My Orders</span>
        </div>
        <div className={styles.section} style={{borderBottom:"2.5px solid #1f1f1f"}} onClick={()=> navigate("/account/wishlist")} >
          <span>My Wishlist</span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/reviews")}>
          <span>My Reviews</span>
        </div>
      </div>

      {/* CONTENT */}
      {
        userFavorites.length ? (
          <div className={styles.content} style={{marginTop: fixSections ? "87.5px" : "0px"}}>
            <div className={styles.top}>
              <div className={styles.itemsTitle}>
                <h2>{userFavorites.length} Items</h2>
              </div>
              <div className={styles.filters}>
                <Translate><span className={styles.filterBy}>Filter by</span></Translate>
                <div className={`${styles.loginInputGenre} ${styles.loginInput}`}>
                  <div className='position-relative'>
                  <Dropdown value={{name: filterBy, code: filterBy}} onChange={(e) => setFilterBy(e.value.name)} optionLabel='name' options={filterSource} className='w-100' />
                    
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cards}>
              {
                sortedItems.length && 
                  sortedItems.map((el, index) => {
                    return <WishlistCard el={el} index={index} userId={user?.id}/>
                  })
              }
            </div>
          </div>
        ):(
          <div className={styles.empty}>
            <p>Your wishlist is empty.</p>
            <button>Explore Collections</button>
          </div>
        )
      }
      <Footer/>
    </div>
   );
}
 
export default Wishlist;