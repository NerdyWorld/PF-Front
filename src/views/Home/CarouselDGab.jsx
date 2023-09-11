import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { HiMiniPause } from "react-icons/hi2";
import { RiVolumeMuteFill } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";

const LandingDGabanna = ({ buttonText, onButtonClick, brandName }) => {
  const [isButtonFixed, setIsButtonFixed] = useState(false);
  const carouselRef = useRef(null);
  const videoRefs = {
    DGab1: useRef(null),
    DGab2: useRef(null),
    DGab3: useRef(null),
    DGab4: useRef(null),
  };

  const [isMuted, setIsMuted] = useState({
    DGab1: true,
    DGab2: true,
    DGab3: true,
    DGab4: true,
  });

  const [isPlaying, setIsPlaying] = useState({
    DGab1: true,
    DGab2: true,
    DGab3: true,
    DGab4: true,
  });

  const playPause = (videoId) => {
    const video = videoRefs[videoId].current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying((prevState) => ({ ...prevState, [videoId]: true }));
      } else {
        video.pause();
        setIsPlaying((prevState) => ({ ...prevState, [videoId]: false }));
      }
    }
  };

  const toggleMute = (videoId) => {
    const video = videoRefs[videoId].current;
    if (video) {
      if (video.muted) {
        video.muted = false;
        muteAllExcept(videoId);
      } else {
        video.muted = true;
      }
      setIsMuted((prevState) => ({
        ...prevState,
        [videoId]: video.muted,
      }));
    }
  };

  const muteAllExcept = (exceptVideoId) => {
    for (const videoRef in videoRefs) {
      const video = videoRefs[videoRef].current;
      if (video && video.id !== exceptVideoId) {
        video.muted = true;
      }
    }
  };

  useEffect(() => {
    const handleChangeVideo = (event) => {
      for (const videoRef in videoRefs) {
        const video = videoRefs[videoRef].current;
        if (video) {
          video.muted = true;
        }
      }
      setIsMuted({ DGab1: true, DGab2: true, DGab3: true, DGab4: true });
    };
    const carouselVolumeVideo = carouselRef.current;
    if (carouselVolumeVideo) {
      carouselVolumeVideo.addEventListener(
        "slide.bs.carousel",
        handleChangeVideo
      );
    }
    return () => {
      if (carouselVolumeVideo) {
        carouselVolumeVideo.removeEventListener(
          "slide.bs.carousel",
          handleChangeVideo
        );
      }
    };
  }, []);
  
 // button fixed and  video muted/unmuted (outside)
 const handleScroll = () => {
  requestAnimationFrame(() => {
     if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect(); 
      const upperLimit = window.innerHeight / 2;
      const scrollLimit = 700; 

      if (rect.bottom > 0 && rect.bottom <= upperLimit && rect.top >= -scrollLimit) {
        setIsButtonFixed(true);
      } else {
        setIsButtonFixed(false);
      }
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        muteAllVideos(); 
      }}});
};    

const muteAllVideos = () => {
  setPreviousMutedState({ ...isMuted });
  for (const videoRef in videoRefs) {
    const video = videoRefs[videoRef].current;
    if (video) {
      video.muted = true;
    }
  }
  setIsMuted({ DGab1: true, DGab2: true, DGab3: true, DGab4: true });
};
const [previousMutedState, setPreviousMutedState] = useState({ ...isMuted });
      
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="landingClassForCarousel">
      <div className="brandContainer">
        <h2 className="brandName">{brandName}</h2>
      </div>
      <div
        id="carouselDolceGabanna"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        ref={carouselRef}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselDolceGabanna"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselDolceGabanna"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselDolceGabanna"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselDolceGabanna"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>

          <div className="video-carousel-inner">
            <div className="carousel-item video-carousel-item active">
              <video
                ref={videoRefs.DGab1}
                id="DGab1"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/dg4.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.DGab1 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab1")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab1")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.DGab1 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab1")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab1")}
                  />
                )}
              </div>
            </div>
            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.DGab2}
                id="DGab2"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/dg1.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.DGab2 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab2")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab2")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.DGab2 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab2")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab2")}
                  />
                )}
              </div>
            </div>

            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.DGab3}
                id="DGab3"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/dg3.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.DGab3 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab3")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab3")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.DGab3 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab3")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab3")}
                  />
                )}
              </div>
            </div>
            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.DGab4}
                id="DGab4"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/dg2.mp4" type="video/mp4" />
              </video>

              <div className="pause-play">
                {isPlaying.DGab4 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab4")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("DGab4")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.DGab4 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab4")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("DGab4")}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          className={`exploreButton ${isButtonFixed ? "fixedButton" : ""}`}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LandingDGabanna;
