import React, { useEffect, useRef, useState } from "react";

const LandingDGabanna = ({ buttonText, onButtonClick, brandName }) => {
    const [isButtonFixed, setIsButtonFixed] = useState(false);
    const carouselRef = useRef(null);

    const handleScroll = () => {
      requestAnimationFrame(() => {
         if (carouselRef.current) {
          const rect = carouselRef.current.getBoundingClientRect();
      
          if (rect.bottom > 0 && rect.bottom <= window.innerHeight / 2) {
            setIsButtonFixed(true);
          } else {
            setIsButtonFixed(false);
          }
        }
      });
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
  const [isMuted, setIsMuted] = useState({ DGab1: true, DGab2: true, DGab3: true, DGab4: true });

  return (
    <>
      <div className='brandContainer'>
        <h2 className='brandName'>{brandName}</h2>
      </div>
    <div
      id="carouselDolceGabanna"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
        <div style={{position: 'relative', overflow: 'hidden'}}>
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
          <video id="DGab1" className="img-fluid" autoPlay loop muted>
            <source src="/images/dg4.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.DGab1 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("DGab1")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.DGab1 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "DGab1")}
              />
            )}
          </div>
        </div>

        <div className="carousel-item video-carousel-item">
          <video id="DGab2" className="img-fluid" autoPlay loop muted>
            <source src="/images/dg1.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.DGab2 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("DGab2")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.DGab2 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "DGab2")}
              />
            )}
          </div>
        </div>

        <div className="carousel-item video-carousel-item">
          <video id="DGab3" className="img-fluid" autoPlay loop muted>
            <source src="/images/dg3.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.DGab3 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("DGab3")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.DGab3 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "DGab3")}
              />
            )}
          </div>
        </div>
        <div className="carousel-item video-carousel-item">
          <video id="DGab4" className="img-fluid" autoPlay loop muted>
            <source src="/images/dg2.mp4" type="video/mp4" />
          </video>
          <div className="video-control">
            <img
              src={isMuted.DGab4 ? "/images/volOff.svg" : "/images/volOn.svg"}
              alt="Volume control"
              onClick={() => toggleMute("DGab4")}
              style={{ cursor: "pointer" }}
            />
            {!isMuted.DGab4 && (
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.5"
                onChange={(e) => handleVolumeChange(e, "DGab4")}
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

export default LandingDGabanna;
