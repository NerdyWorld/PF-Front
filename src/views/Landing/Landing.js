import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";

const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuMenOpen, setMenuMenOpen] = useState(false);
  const menuRef = useRef(null);
  const closeRef = useRef(null);

  
  const toggleMenu = () => {
    setIsMenuOpen((prevMenu) => {
      if (prevMenu) {
        setSubMenuOpen(false);
        setMenuMenOpen(false);

        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !prevMenu;
    });
  };
  const toggleSubMenuOpen = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const toggleSubMenuMenOpen = () => {
    setMenuMenOpen(!subMenuMenOpen);
  };

  // Close the Menu Toggle in others views
  const handleNavigation = (path) => {
    document.body.style.overflow = "";
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      setSubMenuOpen(false);
      setMenuMenOpen(false);
    }
  }, [isMenuOpen]);

  // Clouse menu whit click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !closeRef.current.contains(event.target)
      ) {
        document.body.style.overflow = "";
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="newLanding">
      <div className={isMenuOpen ? "overlay open" : "overlay"}></div>  
      <div ref={closeRef} onClick={toggleMenu} className="menu-toggle-landing">
        {isMenuOpen ? "Close" : "Login"}
      </div>   
      <div
        ref={menuRef}
        className={`toggleMenuLanding ${isMenuOpen ? "open" : ""}`}>
          <p className="createLogin">Create Account</p>

          </div>
      <div className="navbarLanding">
        <div className="titleContainer">
          <h1 className="Landingtitle">
            RVL
          </h1>
          <video
            className="videoLandingLogo"
            onClick={() => {
            document.body.style.overflow = "";  
            navigate("home")}}
            src="/images/logoLanding.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
