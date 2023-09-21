import React from "react";
import styles from "./louisvuitonvideo.module.css";
function Reproductor(props) {
  console.log(props);
  return (
    <div className={styles.videoplayer}>
      <video autoPlay loop playsInline muted controls style={{ width: "100%" }}>
        <source src={props.video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Reproductor;
