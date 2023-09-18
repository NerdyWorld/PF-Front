import React, { useContext } from 'react';
import styles from "./AccountHeader.module.css";
import { GlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import CartModal from '../Modals/Cart/CartModal';
import SearchModal from '../Modals/Search/SearchModal';
import SearchBoxModalRight from '../Modals/Search/SearchBoxModalRight';
import SearchBoxModalLeft from '../Modals/Search/SearchBoxModalLeft';
import LanguageModal from '../Modals/Language/Language';
import LoginModalN from '../Modals/Login/Login';

const AccountHeader = ({refHeader, dark, noBorder}) => {

  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { setShowLoginModal, logged, setShowCartModal, setShowCollectionModal, showCollectionModal, setShowSearchModal, setCurrency, currency, showCurrencyDropdown, setShowCurrencyDropdown, showLanguageModal, setShowLanguageModal, showSearchModal} = globalContext;

  const handleShowLogin = () =>{
    if(logged){
      navigate("/account")
    }else{
      setShowLoginModal(true);
    }
  }

  const handleOpenBag = () =>{
    if(logged){
      setShowCartModal(true);
    }else{
      return;
    }
  };

  const handleOpenStore = () =>{
    if(logged){
      navigate("/ourStore");
    }else{
      return;
    }
  };

  return ( 
    <div className={`${styles.wrapper} ${dark && styles.dark}`} ref={refHeader}>
      
      <LoginModalN/>
      <CartModal/>
      <LanguageModal/>
      <SearchModal/>
      <SearchBoxModalLeft/>
      <SearchBoxModalRight/>

      <div className={styles.header} style={{borderBottom: noBorder ? "#19110b" : "#eae8e4"}}>
        <div className={styles.left}>
          {/* <i className='bx bx-menu'></i> */}
          <div className={styles.world} style={{opacity: showCollectionModal ? 0 : 1}} onClick={()=> setShowLanguageModal(!showLanguageModal)}>
            <i className='bx bx-world'></i>
          </div>

          <div className={styles.currency} style={{opacity: showLanguageModal ? 0 : 1}}>
            <div className={styles.currentCurrency} onClick={()=> setShowCurrencyDropdown(!showCurrencyDropdown)}>
              <div className='d-flex align-items-start justify-content-start w-100'>
                <span className={styles.currencySpan}>{currency}</span>
              </div>
              <div className={styles.currencyToggle}>
                <i className='bx bx-chevron-right bx-xs' style={{transform: showCurrencyDropdown ? "scaleY(-1) rotate(90deg)" : "scaleY(-1) rotate(-90deg)", marginTop: showCurrencyDropdown ? "-1px" : "-4px"}}></i>
              </div>
            </div>
            <div className={styles.currencyDropdown} style={{opacity: showCurrencyDropdown ? "1" : "0", visibility: showCurrencyDropdown ? "visible" : "hidden"}}>
              <ul>
                <li>USD</li>
                <li>EUR</li>
                <li>CAD</li>
                <li>AUD</li>
                <li>ARS</li>
              </ul>
            </div>
          </div>          
          <span className={styles.linkSpan} onClick={()=> navigate("/home")} style={{opacity: showLanguageModal ? "0" : "1"}}>COLLECTIONS</span>
          <span className={styles.linkSpan} style={{opacity: showLanguageModal ? "0" : "1"}} onClick={()=> setShowSearchModal(!showSearchModal)} data-search>SEARCH</span>
        </div>
        <div className={styles.middle} onClick={()=> navigate("/")} style={{opacity: showSearchModal ? 0 : 1}}>
          <h2>RIVELLE</h2>
        </div>
        <div className={styles.right}>
          <span onClick={handleOpenStore}>OUR STORE</span>
          <span onClick={handleShowLogin}>ACCOUNT</span>
          <span onClick={handleOpenBag}>BAG</span>
        </div>
      </div>
    </div>
   );
}
 
export default AccountHeader;