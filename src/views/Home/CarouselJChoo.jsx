import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { HiMiniPause } from "react-icons/hi2";
import { RiVolumeMuteFill } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";

const LandingJChoo = ({ buttonText, onButtonClick, brandName }) => {
  const [isButtonFixed, setIsButtonFixed] = useState(false);
  const carouselRef = useRef(null);
  const videoRefs = {
    jchoo1: useRef(null),
    jchoo2: useRef(null),
    jchoo3: useRef(null),
    jchoo4: useRef(null),
  };

  const [isMuted, setIsMuted] = useState({
    jchoo1: true,
    jchoo2: true,
    jchoo3: true,
    jchoo4: true,
  });

  const [isPlaying, setIsPlaying] = useState({
    jchoo1: true,
    jchoo2: true,
    jchoo3: true,
    jchoo4: true,
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
      setIsMuted({ jchoo1: true, jchoo2: true, jchoo3: true, jchoo4: true });
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
    setIsMuted({ jchoo1: true, jchoo2: true, jchoo3: true, jchoo4: true });
};
const [previousMutedState, setPreviousMutedState] = useState({ ...isMuted });

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <>
      <div className="brandContainer">
        <h2 className="brandName">{brandName}</h2>
      </div>
      <div
        id="carouselJChoo"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        ref={carouselRef}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselJChoo"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselJChoo"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselJChoo"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="video-carousel-inner">
            <div className="carousel-item video-carousel-item active">
              <video
                ref={videoRefs.jchoo1}
                id="jchoo1"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/JChoo1.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.jchoo1 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("jchoo1")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("jchoo1")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.jchoo1 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("jchoo1")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("jchoo1")}
                  />
                )}
              </div>
            </div>
            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.jchoo2}
                id="jchoo2"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/JChoo2.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.jchoo2 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("jchoo2")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("jchoo2")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.jchoo2 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("jchoo2")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("jchoo2")}
                  />
                )}
              </div>
            </div>
            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.jchoo3}
                id="jchoo3"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/JChoo3.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.jchoo3 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("jchoo3")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("jchoo3")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.jchoo3 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("jchoo3")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("jchoo3")}
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
    </>
  );
};

export default LandingJChoo;
