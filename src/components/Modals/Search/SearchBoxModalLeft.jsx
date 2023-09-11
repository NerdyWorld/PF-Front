import React, { useContext } from 'react';
import styles from "./SearchBoxModalLeft.module.css";
import { GlobalContext } from '../../context/globalContext';


const SearchBoxModalLeft = () => {

  const globalContext = useContext(GlobalContext);
  const { showSearchModal } = globalContext;

  const blogName = "LV Women's Fashion Show Spring-Summer 2023";
  const blog2Name = "Pharrell Williams";

  return ( 
    <article className={styles.article} style={{left: showSearchModal ? "0px" : "-100vw"}}>
      <div className={styles.div}>
        <div className={styles.container}>
          <div className={styles.women}>
            <h6>WOMEN</h6>
            <span>Bags</span>
            <span>Heels</span>
            <span>Sneakers</span>
            <span>Sunglasses</span>
            <span>Accesories</span>
          </div>
          <div className={styles.man}>
            <h6>MAN</h6>
            <span>Sneakers</span>
            <span>Accesories</span>
            <span>Sunglasses</span>
          </div>
        </div>

        <span className={styles.world}>MADE IN HEAVEN WORLD</span>
        <div className={styles.blogs}>
          <div className={styles.blog}>
            <div className={styles.blogImg}>
              <img src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Nacho/blogSpringSummer.jpg" alt="abc" />
            </div>
            <div className={styles.blogDetails}>
              <span>{blogName.length > 35 ? blogName.slice(0, 35) + "…" : blogName}</span>
              <span>09/29 - Parades</span>
            </div>
          </div>
          <div className={styles.blog}>
            <div className={styles.blogImg}>
              <img src="https://la.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/world-of-louis-vuitton/la-maison/2045-pharrell-williams/2045_Pharrell_Williams_DI3.jpg?wid=490" alt="abc" />
            </div>
            <div className={styles.blogDetails}>
              <span>{blog2Name.length > 35 ? blog2Name.slice(0, 35) + "…" : blog2Name}</span>
              <span>02/13 - The House</span>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default SearchBoxModalLeft;