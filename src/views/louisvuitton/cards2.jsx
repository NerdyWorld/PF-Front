import React, { useState } from "react";
import styles from "./louisvuitonvideo.module.css";

const Cards2 = ({ img2 }) => {
  return (
    <div className={styles.cards2}>
      {img2.map((image, index) => (
        <div
          className={`${styles.cards2container} ${
            index === 2
              ? `${styles.wide}`
              : index === 13
              ? `${styles.wide}`
              : index === 0 || index === 1 || index === 11 || index === 12
              ? `${styles.narrowconwide}`
              : index === 13
              ? `${styles.wide}`
              : `${styles.narrow}`
          }`}
          key={index}
        >
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Cards2;
