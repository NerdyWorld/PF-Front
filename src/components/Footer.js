import React from "react";


const Footer = () => {
    return (      
        <footer className='footer'>
        <div>
          <p>Contact Us</p>
          <div className='d-flex align-items-start flex-column'>
            <span>Elegance Street #40a, Modaville, PF</span>
            <span>Fashionlandia</span>
            <span>Zip  98765</span>
          </div>
          <div style={{fontSize:"13px", marginTop:"2rem"}}>
            <i className="fa-solid fa-phone me-2" style={{color:"white"}}></i>
            <a href="tel:+17866578903" style={{textDecoration:"none", color:"white"}}>+17866578903</a>
          </div>
          <div style={{fontSize:"13px", marginTop:"2rem"}}>
            <i className="fa-solid fa-envelope me-2"></i>
            <a href="mailto:rivellecompany@gmail.com" style={{textDecoration:"none", color:"white"}}>rivellecompany@gmail.com</a>
          </div>
          <div className='mt-4 d-flex align-items-center gap-10'>
            <i className="fa-brands fa-github"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
        <div className='d-flex align-items-start flex-column gap-10'>
          <p>Information</p>
          <span>Privacy Policy</span>
          <span>Refund Policy</span>
          <span>Shipping Policy</span>
          <span>Terms Of Service</span>
          <span>Blogs</span>
        </div>
        <div className='d-flex align-items-start flex-column gap-10'>
          <p>FAQ</p>
          <span>How do I create an account?</span>
          <span>How do I make a purchase?</span>
          <span>Can I reset my password?</span>
          <span>Can I delete my account?</span>
          <span>How do I see my orders?</span>
        </div>
        <div className='d-flex align-items-start flex-column gap-10'>
          <p>Quick Links</p>
          <span>My Orders</span>
          <span>My Account</span>
        </div>
      </footer>
    )
}

export default Footer;
