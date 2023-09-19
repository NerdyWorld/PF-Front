import React, { useEffect, useState } from "react";
import { FaCcVisa, FaCcPaypal } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productSlice";
import CartButton from "../../components/Modals/AddCart/AddCart";


const ProductDetail = ({ productId, initialSelectedColor }) => {
  const [isMenuDetailOpen, setMenuDetailOpen] = useState(false);
  const [isMaterialOpen, setMaterialOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [isPaymentOptionsOpen, setPaymentOptionsOpen] = useState(false);
  const products = useSelector((state) => state.products.products);
  const product = products.find((product) => product.id === productId);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const [showCartButton, setShowCartButton] = useState(false); 


  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products]);


  useEffect(() => {
    const handleScroll = () => {
        closeCart();
    };
    if (isCartOpen) {
        window.addEventListener('scroll', handleScroll);
    }
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, [isCartOpen]);

  const [selectedColor, setSelectedColor] = useState(
    initialSelectedColor ||
      (product && product.colors && product.colors.length > 0
        ? product.colors[0]
        : "")
  );
  const toggleMenu = () => {
    setMenuDetailOpen(!isMenuDetailOpen);
  };
  const toggleMaterial = () => {
    setMaterialOpen(!isMaterialOpen);
  };

  const togglePaymentOptions = () => {
    setPaymentOptionsOpen(!isPaymentOptionsOpen);
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  const addToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    if (!userState.user || !userState.user.id) {
      return;
    }
   
    setShowCartButton(true);
  };

  return (
    <div className={`detail-container ${isMenuDetailOpen ? "open" : ""}`}>
    
      {product && product.images && product.images.length > 0 && (
        <div className="image-section">
          {product.images.map((colorImages) => {
            if (colorImages.color === selectedColor) {
              return colorImages.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${product.name}-${index}`}
                  className="product-image"
                />
              ));
            }
            return null;
          })}          
        </div>
      )}     
      
      <div className="info-section">
        <h2 className="brandDetail">{product.brand}</h2>
        <p className="nameDetail">
          {product.name} - {product.categories}
        </p>
        <div className="container-detail">
          <p className="priceDetail">usd {product.price}</p>
          {product && product.colors && product.colors.length > 0 && (
            <div className="colors-detail">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className={`color-sample-dt ${
                    color === selectedColor ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></span>
              ))}
            </div>
          )}
          <div className="size-selection">
            <label htmlFor="size"></label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setSizeError(false);
              }}
              className={sizeError ? "error" : ""}
            >
              <option value="">Select size.</option>
              {product.sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {sizeError && (
              <p className="size-error-message">Please select a size.</p>
            )}
          </div>

          <button onClick={addToCart} className="btnDetail">
            Place in cart
            <svg className="cartIcon" viewBox="0 0 576 512">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </button>
            </div>
          <div className="container-detail-product">
            <p className="title-pdetail">Product Details</p>
            <p className="description-detail">{product.description}</p>
            <div className="specifications">
              {product.specifications.split("@").map((el, index) => {
                if (index > 0) {
                  return <li key={index}>{el}</li>;
                }
              })}
            </div>  

          <p className="prod-detail" onClick={toggleMenu}>
            More Info
          </p>     
           </div>
      
      </div>
      {isMenuDetailOpen && (
        <div className="detail-menu">
          <div className="close-det">
            <button className="bntclose" onClick={toggleMenu}>
              X
            </button>
          </div>
          <div className="section-toggle" onClick={toggleMaterial}>
            <h4 className="subtitle-detail">MATERIALS AND CARE</h4>
            <span className="toggle-icon">{isMaterialOpen ? "-" : "+"}</span>
          </div>
          {isMaterialOpen && (
            <ul>
              <li>
                Protect the product from direct exposure to light, heat, and
                rain.
              </li>
              <li>If it gets wet, dry it immediately with a soft cloth.</li>
              <li>
                Stuff the handbag with tissue paper to maintain its shape and
                absorb moisture, and store it in the provided flannel bag.
              </li>
              <li>Avoid carrying heavy items that might deform the bag.</li>
              <li>Clean the product with a soft, dry cloth.</li>
            </ul>
          )}
          <div className="section-toggle" onClick={togglePaymentOptions}>
            <h4 className="subtitle-detail">PAYMENT OPTIONS</h4>
            <span className="toggle-icon">
              {isPaymentOptionsOpen ? "-" : "+"}
            </span>
          </div>
          {isPaymentOptionsOpen && (
            <div>
              <div className="payment-icons">
                <div className="payment-icon">
                  <FaCcVisa size={32} />
                  <span className="card-det">Visa</span>
                </div>
                <div className="payment-icon">
                  <FaCcMastercard size={32} />
                  <span className="card-det">MasterCard</span>
                </div>
                <div className="payment-icon">
                  <SiAmericanexpress size={32} />
                  <span className="card-det">American Express</span>
                </div>
                <div className="payment-icon">
                  <FaCcPaypal size={32} />
                  <span className="card-det">Paypal</span>
                </div>
                <div className="payment-icon">
                  <FaGooglePay size={32} />
                  <span className="card-det">Google Pay</span>
                </div>
              </div>
              <div className="ul-det">
                <ul>
                  *excluding Kuwait, Qatar and Saudi Arabia. For credit card
                  payments, please note that your billing address must match the
                  address on your credit card statement.
                </ul>
                <ul>
                  Please note that once your order is placed your credit card
                  will be authorized for 0 GBP (CHF, AED, SAR or EUR for all
                  other countries); this is for verification purposes only and
                  will protect you from any risk of fraud. The authorized amount
                  will be released by your credit card’s issuing bank according
                  to its policy.
                </ul>
                <ul>
                  Save as otherwise stated on the website during the purchase
                  process, the purchase transaction will only be charged to your
                  credit card after we have verified your card details, received
                  credit authorization for an amount equal to the purchase price
                  of the ordered products, confirmed product availability and
                  prepared your order for shipping.
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      {showCartButton && (
        <CartButton 
          product={{ ...product, selectedSize, selectedColor }} 
          close={() => setIsCartOpen(false)}
           />
          )}
    </div>
  );
};

export default ProductDetail;