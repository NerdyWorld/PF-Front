import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";

const Footer = () => {
  const navigate = useNavigate();
  const refToast = useRef();
  const state = useSelector((state) => state);
  const { user } = state.user;

  const handleNavigate = (e) => {
    console.log(user);
    if (user === undefined) {
      refToast.current.show({
        life: 3000,
        severity: "info",
        summary: "We're sorry",
        detail: "You must be logged in",
      });
    } else {
      navigate(e.target.dataset.id);
    }
  };

  return (
    <footer className="footer">
      <div>
        <Toast ref={refToast} position="top-left"></Toast>
        <p>Contact Us</p>
        <div className="d-flex align-items-start flex-column">
          <span>Elegance Street #40a, Modaville, PF</span>
          <span>Fashionlandia</span>
          <span>Zip 98765</span>
        </div>
        <div style={{ fontSize: "13px", marginTop: "2rem" }}>
          <i
            className="fa-solid fa-phone me-2"
            style={{ color: "white", cursor: "pointer" }}
          ></i>
          <a
            href="tel:+17866578903"
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            +17866578903
          </a>
        </div>
        <div style={{ fontSize: "13px", marginTop: "2rem" }}>
          <i className="fa-solid fa-envelope me-2"></i>
          <a
            href="mailto:rivellecompany@gmail.com"
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            rivellecompany@gmail.com
          </a>
        </div>
        <div className="mt-4 d-flex align-items-center gap-10">
          <i
            className="fa-brands fa-github"
            onClick={() => {
              window.open("https://github.com/NerdyWorld", "_blank");
            }}
          ></i>
        </div>
      </div>
      <div className="d-flex align-items-start flex-column gap-10">
        <p>Information</p>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/privacy-policy")}
        >
          Privacy Policy
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/refund-policy")}
        >
          Refund Policy
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/shipping-policy")}
        >
          Shipping Policy
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/terms")}
        >
          Terms Of Service
        </span>
      </div>
      <div className="d-flex align-items-start flex-column gap-10">
        <p>FAQ</p>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/faq-1")}
        >
          How do I create an account?
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/faq-2")}
        >
          How do I make a purchase?
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/faq-3")}
        >
          Can I reset my password?
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/faq-4")}
        >
          Can I delete my account?
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/information/faq-5")}
        >
          How do I see my orders?
        </span>
      </div>
      <div className="d-flex align-items-start flex-column gap-10">
        <p>Quick Links</p>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={handleNavigate}
          data-id="/account/orders"
        >
          My Orders
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={handleNavigate}
          data-id="/account"
        >
          My Account
        </span>
      </div>
    </footer>
  );
};

export default Footer;
