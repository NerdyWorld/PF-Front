import React, { useEffect, useRef, useState } from "react";

const LandingFendi = ({ buttonText, onButtonClick, brandName }) => {
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
  const [isMuted, setIsMuted] = useState({ fendi1: true, fendi2: true, fendi3: true });

  return (
    <>
      <div className='brandContainer'>
        <h2 className='brandName'>{brandName}</h2>
      </div>
    <div
      id="carouselFendi"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
        <div style={{position: 'relative', overflow: 'hidden'}}>
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
          <video id="fendi1" className="img-fluid" autoPlay loop muted>
            <source src="/images/fendi1.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.fendi1 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("fendi1")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.fendi1 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "fendi1")}
              />
            )}
          </div>
        </div>

        <div className="carousel-item video-carousel-item">
          <video id="fendi2" className="img-fluid" autoPlay loop muted>
            <source src="/images/fendi2.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.fendi2 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("fendi2")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.fendi2 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "fendi2")}
              />
            )}
          </div>
        </div>
         
        <div className="carousel-item video-carousel-item">
          <video id="fendi3" className="img-fluid" autoPlay loop muted>
            <source src="/images/fendi.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.fendi3 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("fendi3")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.fendi3 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "fendi3")}
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

export default LandingFendi;