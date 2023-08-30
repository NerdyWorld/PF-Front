import React, { useEffect, useRef, useState } from "react";
import Login from "../Login/Login";
import LandingContent from "./LandingContent";
import Carousel from "./CarouselGucci";
import LouisVuitton from "./CarouselLv";
import LoginModal from "../../components/Modals/LoginModal";
import LandingVuitton from "./CarouselLv";
import LandingJChoo from "./CarouselJChoo";
import LandingGucci from "./CarouselGucci";
import LandingDGabanna from "./CarouselDGab";
import LandingFendi from "./CarouselFendi";
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
        } else {
          titleLanding.current.style.fontSize = "3rem";
          titleLanding.current.style.fontWeight= "400";
          titleLanding.current.style.boxShadow =
            "0 8px 10px -6px rgba(0, 0, 0, 1)";
          titleLanding.current.style.background = "rgba(255, 255, 255, 0.103)";
          titleLanding.current.style.color = "#000000";
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

  return (
    <div className="landing">
      <div className="navbar">
        <div className="titleLanding">
          {showLogin && (
            <>
            <div className="containerLogin">
              <h4 className="menuLogin" onClick={() => setIsModalOpen(true)}>
                Login
              </h4>
              </div>
            <div className="menuLanding">
              <h4 className="menuHome">Woman</h4>
              <h4 className="menuHome">Men</h4>
            </div>
            </>
          )}
          <h1 ref={titleLanding} className="LandingWelc">
            Rivélle
          </h1>
          {showLogin && (
            <div className="movingContainer">
            <div className="movingText">
              <h4
                className="seeAllCollections"
                onClick={() => navigate("home")}
              >
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections </span>
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections</span>
                <span className="movingHome">See all our collections</span>
              </h4>
            </div>
          </div>
          )}
          
          {/* {showLogin && <h3 onClick={() => navigate("home")} className="seeAllCollections">see all our collections</h3> }  */}
        </div>
      </div>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      <div className="contentLanding">
        <LandingVuitton
          buttonText="Explore the Louis Vuitton collection"
          brandName="Louis Vuitton"
          onButtonClick={() => setIsModalOpen(true)}
        />
        <LandingGucci
          buttonText="Explore the Gucci collection"
          brandName="Gucci"
          onButtonClick={() => setIsModalOpen(true)}
        />
        <LandingJChoo
          buttonText="Explore the Jimmy Choo collection"
          brandName="Jimmy Choo"
          onButtonClick={() => setIsModalOpen(true)}
        />
        <LandingDGabanna
          buttonText="Explore the Dolce & Gabanna collection"
          brandName="Dolce & Gabanna"
          onButtonClick={() => setIsModalOpen(true)}
        />
        <LandingFendi
          buttonText="Explore the Fendi collection"
          brandName="Fendi"
          onButtonClick={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );
};

export default Landing;
