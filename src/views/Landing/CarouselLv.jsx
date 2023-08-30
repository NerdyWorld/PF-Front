import React, { useEffect, useRef, useState } from "react";

const LandingVuitton = ({ buttonText, onButtonClick, brandName }) => {
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
  const [isMuted, setIsMuted] = useState({ LVuitton1: true, LVuitton2: true, LVuitton3: true, LVuitton4: true });

  return (
    <>
      <div className='brandContainer'>
        <h2 className='brandName'>{brandName}</h2>
      </div>
    <div
      id="carouselLouisVuitton"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
        <div style={{position: 'relative', overflow: 'hidden'}}>
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselLouisVuitton"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselLouisVuitton"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
         <button
          type="button"
          data-bs-target="#carouselLouisVuitton"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
         <button
          type="button"
          data-bs-target="#carouselLouisVuitton"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>

      <div className="video-carousel-inner">
        <div className="carousel-item video-carousel-item active">
          <video id="LVuitton1" className="img-fluid" autoPlay loop muted>
            <source src="/images/Lvideo3.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.LVuitton1 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("LVuitton1")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.LVuitton1 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "LVuitton1")}
              />
            )}
          </div>
        </div>

        <div className="carousel-item video-carousel-item">
          <video id="LVuitton2" className="img-fluid" autoPlay loop muted>
            <source src="/images/Lvideo2.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.LVuitton2 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("LVuitton2")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.LVuitton2 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "LVuitton2")}
              />
            )}
          </div>
        </div>

        <div className="carousel-item video-carousel-item">
          <video id="LVuitton3" className="img-fluid" autoPlay loop muted>
            <source src="/images/Lvideo4.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.LVuitton3 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("LVuitton3")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.LVuitton3 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "LVuitton3")}
              />
            )}
          </div>
        </div>
        <div className="carousel-item video-carousel-item">
          <video id="LVuitton4" className="img-fluid" autoPlay loop muted>
            <source src="/images/Lvideo.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.LVuitton4 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("LVuitton4")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.LVuitton4 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "LVuitton4")}
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

export default LandingVuitton;
