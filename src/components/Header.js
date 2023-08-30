import React, { useState } from "react";
import { Translate } from "react-auto-translate/lib/commonjs";
import { useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useThemeContext } from "../context/globalContext";

const Header = () => {
    const navigate = useNavigate(); 
    const [checked, setChecked] = useState(false);
    const { contextTheme, setContextTheme } = useThemeContext();
  
    const handleSwitch = (nextChecked) => {
      setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
      setChecked(nextChecked);
    }; 

    return (    
      <header className="App-header">  
         {/* <header className="App-header" id={contextTheme}> */}
         <div className='header d-flex w-100'> 
         {/* <ReactSwitch
          onChange={handleSwitch}
          checked={checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={15}
          width={52}
          className="react-switch"
          id="material-switch"
        /> */}
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
