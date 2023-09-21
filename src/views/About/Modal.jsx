import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
