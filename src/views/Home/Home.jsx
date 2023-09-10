import React, { useEffect, useRef, useState } from "react";
import LoginModal from "../../components/Modals/LoginModal";
import LandingVuitton from "./CarouselLv";
import LandingJChoo from "./CarouselJChoo";
import LandingGucci from "./CarouselGucci";
import LandingDGabanna from "./CarouselDGab";
import LandingFendi from "./CarouselFendi";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
          titleLanding.current.style.paddingTop = "35px";
          titleLanding.current.style.marginTop = "55px";
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

  return (
    <div className="landing">
      <div className="navbar">
        <div className="titleLanding">
          <h1 ref={titleLanding} className="LandingWelc">
            Rivélle
          </h1>
          {showLogin && (
            <div className="movingContainer">
              <div className="movingText">
                <h4 className="seeAllCollections">
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
        </div>
      </div>
      <div className="contentLanding">
        <LandingVuitton
          buttonText="Explore the Louis Vuitton collection"
          brandName="Louis Vuitton"
          onButtonClick={() => navigate("/collection/louisvuitton")}
        />
        <LandingGucci
          buttonText="Explore the Gucci collection"
          brandName="Gucci"
          onButtonClick={() => navigate("/collection/gucci")}
        />
        <LandingJChoo
          buttonText="Explore the Jimmy Choo collection"
          brandName="Jimmy Choo"
          onButtonClick={() => navigate("/collection/jimmychoo")}
        />
        <LandingDGabanna
          buttonText="Explore the Dolce & Gabanna collection"
          brandName="Dolce & Gabanna"
          onButtonClick={() => navigate("/collection/dolcegabbana")}
        />
        <LandingFendi
          buttonText="Explore the Fendi collection"
          brandName="Fendi"
          onButtonClick={() => navigate("/collection/fendi")}
        />
      </div>
    </div>
  );
};

export default Home;
