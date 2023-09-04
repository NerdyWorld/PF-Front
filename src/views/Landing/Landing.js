import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "./Register";

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
        document.body.style.overflow = "";
      }
      return !prevMenu;
    });
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
      <div className="nav-landing">
       <p className="rvl-landing">Rivélle</p>     
        <p className="home-click" onClick={() => {
            document.body.style.overflow = "";  
            navigate("home")}}>Go to collections</p>
        </div>      
      <div className={isMenuOpen ? "overlay open" : "overlay"}></div>  
      <div ref={closeRef} onClick={toggleMenu} className="menu-toggle-landing">
        {isMenuOpen ? "Close" : "Login"} 
      </div> 
      <div
        ref={menuRef}
        className={`toggleMenuLanding ${isMenuOpen ? "open" : ""}`}>
         <h3 className="create-landing mb-5 text-uppercase">Sign up now</h3>
          <Register/>
          </div>         
    </div>
  );
};

export default Landing;
