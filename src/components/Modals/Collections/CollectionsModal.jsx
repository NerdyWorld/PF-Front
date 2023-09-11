import React, { useContext, useState } from 'react';
import styles from "./Collections.module.css";
import { GlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

const CollectionsModal = () => {

  const navigate = useNavigate();

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { showCollectionModal, setShowCollectionModal } = globalContext;


  const [collectionVisible, setCollectionVisible] = useState("");

  const $videoI = document.querySelectorAll("div[data-collection]");  

  const cb = (entries) =>{             
    entries.forEach((entry) => {    

      if(entry.isIntersecting){ 
        setCollectionVisible(entry.target.dataset.collection);
      }

    });
  };

  const observer = new IntersectionObserver(cb, {
      threshold: 0.55,
  });
      

  $videoI.forEach((el) => observer.observe(el));   
  

  return ( 
    <article className={styles.article} style={{left: showCollectionModal ? "0" : "-1500px"}}>
      <div className={styles.div}>
        <div className={styles.close} onClick={()=> setShowCollectionModal(false)}>
          <i className='bx bx-x'></i>
        </div>
        <div className={styles.container}>
          <div className={styles.collections}>
            <div className={styles.eachCollection} onClick={()=> navigate("/collection/louisVuitton")}>
              <h4 className={collectionVisible === "LV" && styles.active}>Louis Vuitton</h4>
              <i className='bx bx-chevron-right'></i>
            </div>
            <div className={styles.eachCollection} onClick={()=> navigate("/collection/gucci")}>
              <h4 className={collectionVisible === "Gucci" && styles.active}>Gucci</h4>
              <i className='bx bx-chevron-right'></i>
            </div>
            <div className={styles.eachCollection} onClick={()=> navigate("/collection/fendi")}>
              <h4 className={collectionVisible === "Fendi" && styles.active}>Fendi</h4>
              <i className='bx bx-chevron-right'></i>
            </div>
            <div className={styles.eachCollection} onClick={()=> navigate("/collection/dolce&gabanna")}>
              <h4 className={collectionVisible === "Dolce" && styles.active}>Dolce & Gabanna</h4>
              <i className='bx bx-chevron-right'></i>
            </div>
            <div className={styles.eachCollection} onClick={()=> navigate("/collection/jimmyChoo")}>
              <h4 className={collectionVisible === "Jimmy" && styles.active}>Jimmy Choo</h4>
              <i className='bx bx-chevron-right'></i>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default CollectionsModal;