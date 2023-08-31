import React, { useState } from "react";
import { Translate } from "react-auto-translate/lib/commonjs";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate(); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [subMenuMenOpen, setMenuMenOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }

    const toggleSubMenuOpen = () => {
      setSubMenuOpen(!subMenuOpen);
    }
    
    const toggleSubMenuMenOpen = () => {
      setMenuMenOpen(!subMenuMenOpen);
    }

    return (    
      <header className="App-header">   
       <div onClick={toggleMenu} className="menu-toggle">
          {isMenuOpen ? "Close" : "Menú"}
          </div>    
         <div className={`toggleMenuHome ${isMenuOpen ? 'open' : ''}`}>      
       <div className="textMenu">
        <p onClick={toggleSubMenuOpen}>Woman</p>
        <div className={`submenu ${subMenuOpen ? 'open' : ''}`}>
        <p>Louis Vuitton</p>
        <p>Gucci</p>
        <p>Jimmy Choo</p>
        <p>Dolce & Gabanna</p>
        <p>Fendi</p>
        </div>
        <p onClick={toggleSubMenuMenOpen}>Men</p>
        <div className={`submenu ${subMenuMenOpen ? 'open' : ''}`}>
        <p>Louis Vuitton</p>
        <p>Gucci</p>
        <p>Jimmy Choo</p>
        <p>Dolce & Gabanna</p>
        <p>Fendi</p>
        </div>
        </div>
        </div>     
         <div className='header d-flex w-100'>
         
            <div className='d-flex align-items-center justify-content-center text-white'>
            <div className='header-links'>
             <p className='me-5' onClick={()=> navigate("home")}>Home</p>
             <p className='me-5' onClick={()=> navigate("about")}>About</p>
             <p onClick={()=> navigate("Checkout")}>Checkout</p>
        </div>
        </div>
        </div>        
    </header>
    )
}

export default Header;
