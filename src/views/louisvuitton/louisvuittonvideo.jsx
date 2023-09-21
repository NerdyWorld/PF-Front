import React, { useRef, useState, useEffect } from "react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { HiMiniPause } from "react-icons/hi2";
import { RiVolumeMuteFill } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";
import styles from "./louisvuitonvideo.module.css";

const AutoPlayVideo = ({ videoSource }) => {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Función para alternar entre pausa y reproducción del video
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // Función para alternar entre mute y desmute del video
  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Evento para detectar el final del video y reiniciar la reproducción
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
      });

      // Reproducir el video automáticamente cuando se carga el componente
      video.play();
    }

    // Limpiar el evento cuando se desmonta el componente
    return () => {
      if (video) {
        video.removeEventListener("ended", () => {});
      }
    };
  }, []);

  return (
    <div className={`autoplay-video ${styles.contenedor}`}>
      <video ref={videoRef} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video>
      <div className={`pause-play ${styles.pauseplay}`}>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <HiMiniPause
              style={{ color: "white", cursor: "pointer" }}
              size={25}
            />
          ) : (
            <IoMdPlay style={{ color: "white", cursor: "pointer" }} size={25} />
          )}
        </button>
      </div>
      <div className={`video-control ${styles.videocontrol}`}>
        <button onClick={toggleMute}>
          {isMuted ? (
            <RiVolumeMuteFill
              size={25}
              style={{ cursor: "pointer", color: "white" }}
            />
          ) : (
            <IoVolumeHighSharp
              size={25}
              style={{ cursor: "pointer", color: "white" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default AutoPlayVideo;
