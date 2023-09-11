import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {

    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    const switchToRegister = () => {
        setIsRegistering(true);
    };

    const switchToLogin = () => { 
        setIsRegistering(false);
    };

  return (
    <div className="loginModal" onClick={handleOutsideClick}>
      <div className="login-card">
        {isRegistering ? (
            <>            
            <input type="text" placeholder="Username" className="input-underline" />
            <input type="email" placeholder="Email" className="input-underline" />
            <input type="password" placeholder="Password" className="input-underline" />
            <button className="register-btn">Register</button>
            <div className="instruction-text" >
              Already have an account? <p className='signIn' onClick={switchToLogin}>Sign in</p>
            </div> 
           </>           
        ) : ( 
            <>            
        <button className="normal-signin">Sign in</button>
        <div className="instruction-text">
              Don't have an Account? Create Account
        </div>
        <button className="create-account" onClick={()=> navigate("/signUp")}>Create Account</button>
        <div className="instruction-text">Or sign in with</div>
        <div className="boxLog">
        <button className="github containerLogin">
        <img className="imgGoogle loginGoogle" src="/images/github.svg" alt="Github"/>
        </button>
        <button className='github containerLogin'>
          <img className="imgGoogle loginGoogle" src="/images/google.svg" alt="Google" />
        </button> 
        <button className='github containerLogin'>
          <img className="imgGoogle loginGoogle" src="/images/fb.svg" alt="Google" />
        </button> 
        </div>       
            </>
        )}
         
      </div>
    </div>
  );
};

export default LoginModal;
