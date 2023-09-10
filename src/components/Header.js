import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./Modals/LoginModal";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuMenOpen, setMenuMenOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <header className="App-header">
      <div className={isMenuOpen ? "overlay open" : "overlay"}></div>     
      <div ref={closeRef} onClick={toggleMenu} className="menu-toggle">
        {isMenuOpen ? "Close" : "Menu"}
        </div>     
      <div
        ref={menuRef}
        className={`toggleMenuHome ${isMenuOpen ? "open" : ""}`}>      
        {showLogin && (
          <>
            <div className="containerLogin">
              <h4 className="menuLogin" onClick={() => setIsModalOpen(true)}>
                Login
              </h4>
            </div>
          </>
        )}
        <div className="textMenu">
          <p className="nameToggleSub" onClick={toggleSubMenuOpen}>
            Woman
          </p>
          <div className={`submenu ${subMenuOpen ? "open" : ""}`}>
            <p onClick={() => navigate("/collection/louisvuitton")}>Louis Vuitton</p>
            <p onClick={() => navigate("/collection/gucci")}>Gucci</p>
            <p onClick={() => navigate("/collection/jimmychoo")}>Jimmy Choo</p>
            <p onClick={() => navigate("/collection/dolcegabbana")}>Dolce & Gabanna</p>
            <p onClick={() => navigate("/collection/fendi")}>Fendi</p>
          </div>
          <p className="nameToggleSub" onClick={toggleSubMenuMenOpen}>
            Men
          </p>
          <div className={`submenu ${subMenuMenOpen ? "open" : ""}`}>
            <p>Louis Vuitton</p>
            <p>Gucci</p>
            <p>Jimmy Choo</p>
            <p>Dolce & Gabanna</p>
            <p>Fendi</p>
          </div>
          <p onClick={() => navigate("/")}>Back</p>
        </div>
      </div>        
      <div className="header d-flex w-100"> 
        <div className="d-flex align-items-center justify-content-center text-white">
          <div className="header-links">         
            <p className="me-5" onClick={() => handleNavigation("home")}>
              Home
            </p>
            <p className="me-5" onClick={() => handleNavigation("about")}>
              About
            </p>
            <p onClick={() => handleNavigation("Checkout")}>Checkout</p>    
          </div>
        </div>
        {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;
