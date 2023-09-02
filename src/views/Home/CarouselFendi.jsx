import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { HiMiniPause } from "react-icons/hi2";
import { RiVolumeMuteFill } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";

const LandingFendi = ({ buttonText, onButtonClick, brandName }) => {
  const [isButtonFixed, setIsButtonFixed] = useState(false);
  const carouselRef = useRef(null);
  const videoRefs = {
    fendi1: useRef(null),
    fendi2: useRef(null),
    fendi3: useRef(null),
    fendi4: useRef(null),
  };

  const [isMuted, setIsMuted] = useState({
    fendi1: true,
    fendi2: true,
    fendi3: true,
    fendi4: true,
  });

  const [isPlaying, setIsPlaying] = useState({
    fendi1: true,
    fendi2: true,
    fendi3: true,
    fendi4: true,
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
      setIsMuted({ fendi1: true, fendi2: true, fendi3: true, fendi4: true });
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
  // button fixed and  video muted (outside)
  const handleScroll = () => {
    requestAnimationFrame(() => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const upperLimit = window.innerHeight / 2;
        const scrollLimit = 700;

        if (
          rect.bottom > 0 &&
          rect.bottom <= upperLimit &&
          rect.top >= -scrollLimit
        ) {
          setIsButtonFixed(true);
        } else {
          setIsButtonFixed(false);
        }
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          muteAllVideos();
        }
      }
    });
  };
  const muteAllVideos = () => {
    setPreviousMutedState({ ...isMuted });
    for (const videoRef in videoRefs) {
      const video = videoRefs[videoRef].current;
      if (video) {
        video.muted = true;
      }
    }
    setIsMuted({ fendi1: true, fendi2: true, fendi3: true, fendi4: true });
  };
  const [previousMutedState, setPreviousMutedState] = useState({ ...isMuted });

  // button fixed scroll
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
        id="carouselFendi"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        ref={carouselRef}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselFendi"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselFendi"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselFendi"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="video-carousel-inner">
            <div className="carousel-item video-carousel-item active">
              <video
                ref={videoRefs.fendi1}
                id="fendi1"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/fendi1.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.fendi1 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("fendi1")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("fendi1")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.fendi1 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("fendi1")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("fendi1")}
                  />
                )}
              </div>
            </div>
            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.fendi2}
                id="fendi2"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/fendi2.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.fendi2 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("fendi2")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("fendi2")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.fendi2 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("fendi2")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("fendi2")}
                  />
                )}
              </div>
            </div>

            <div className="carousel-item video-carousel-item">
              <video
                ref={videoRefs.fendi3}
                id="fendi3"
                className="img-fluid"
                autoPlay
                loop
                muted
              >
                <source src="/images/fendi.mp4" type="video/mp4" />
              </video>
              <div className="pause-play">
                {isPlaying.fendi3 ? (
                  <HiMiniPause
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("fendi3")}
                  />
                ) : (
                  <IoMdPlay
                    style={{ color: "white", cursor: "pointer" }}
                    size={25}
                    onClick={() => playPause("fendi3")}
                  />
                )}
              </div>
              <div className="video-control">
                {isMuted.fendi3 ? (
                  <RiVolumeMuteFill
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("fendi3")}
                  />
                ) : (
                  <IoVolumeHighSharp
                    size={25}
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => toggleMute("fendi3")}
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

export default LandingFendi;
