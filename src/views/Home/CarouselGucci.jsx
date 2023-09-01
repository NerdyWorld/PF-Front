import React, { useEffect, useRef, useState } from "react";

const LandingGucci = ({ buttonText, onButtonClick, brandName }) => {
    const [isButtonFixed, setIsButtonFixed] = useState(false);
    const carouselRef = useRef(null);

    const handleScroll = () => {
        if (carouselRef.current) {
          const rect = carouselRef.current.getBoundingClientRect();
      
          if (rect.bottom > 0 && rect.bottom <= window.innerHeight / 2) {
            setIsButtonFixed(true);
          } else {
            setIsButtonFixed(false);
          }
        }
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  //   Volume and mute 
  
    const handleVolumeChange = (e, videoId) => {
    const video = document.getElementById(videoId);
    video.volume = e.target.value;
  };
  const toggleMute = (videoId) => {
    const video = document.getElementById(videoId);
    video.muted = !video.muted;
    setIsMuted((prevState) => ({ ...prevState, [videoId]: video.muted }));
  };
  const [isMuted, setIsMuted] = useState({ video1: true, video2: true, video3: true, video4: true });

  return (
    <>
      <div className='brandContainer'>
        <h2 className='brandName'>{brandName}</h2>
      </div>
    <div
      id="carouselVideoExample"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
        <div style={{position: 'relative', overflow: 'hidden'}}>
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselVideoExample"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselVideoExample"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
         <button
          type="button"
          data-bs-target="#carouselVideoExample"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        </div>
      <div className="video-carousel-inner">
        <div className="carousel-item video-carousel-item active">
          <video id="video1" className="img-fluid" autoPlay loop muted>
            <source src="/images/gucci1.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.video1 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("video1")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.video1 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "video1")}
              />
            )}
          </div>
        </div>

        <div className="carousel-item video-carousel-item">
          <video id="video2" className="img-fluid" autoPlay loop muted>
            <source src="/images/gucci2.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.video2 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("video2")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.video2 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "video2")}
              />
            )}
          </div>
        </div>
        <div className="carousel-item video-carousel-item">
          <video id="video3" className="img-fluid" autoPlay loop muted>
            <source src="/images/gucci3.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.video3 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("video3")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.video3 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "video3")}
              />
            )}
          </div>
        </div>
        </div>
      </div>
      <button
        className={`exploreButton ${
          isButtonFixed ? "fixedButton" : ""
        }`}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
    </>
  );
};

export default LandingGucci;
