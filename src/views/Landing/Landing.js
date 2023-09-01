import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const titleLanding = useRef(null);
  const [showLogin, setShowLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (titleLanding.current) {
        if (scrolled < 50) {
          titleLanding.current.style.fontSize = `${11 - scrolled / 5}rem`;
          titleLanding.current.style.transform = "translateX(0)";
          titleLanding.current.style.background = "#0e0e0e";
          titleLanding.current.style.color = "#fff";
          } else if (scrolled >= 50 && scrolled < 150) {
          titleLanding.current.style.fontSize = "6rem";
          titleLanding.current.style.background = "#0e0e0e";
          titleLanding.current.style.transform = "translateX(0)";
          titleLanding.current.style.marginTop = "0";
        } else {
          titleLanding.current.style.fontSize = "3rem";
          titleLanding.current.style.fontWeight = "400";
          titleLanding.current.style.boxShadow =
            "0 8px 10px -6px rgba(0, 0, 0, 1)";
          titleLanding.current.style.backdropFilter = "blur(5px)";
          titleLanding.current.style.marginTop = "0";
          titleLanding.current.style.padding = "2px";
          titleLanding.current.style.background = "rgba(255, 255, 255, 0.1)";
          titleLanding.current.style.color = "#fff";
        }
      }
      if (scrolled > 50) {
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return(
    <div className="newLanding">
    <div className="navbarLanding">
      <div className="titleContainer">
        <h1 ref={titleLanding} className="Landingtitle">
          Rivélle
        </h1>

    </div>
    </div>
    </div>
  )


};

export default Landing;
