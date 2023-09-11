import React, { useEffect, useState } from "react";
import { FaCcVisa, FaCcPaypal } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productSlice";

const ProductDetail = ({ productId }) => {
  const [isMenuDetailOpen, setMenuDetailOpen] = useState(false);
  const [isMaterialOpen, setMaterialOpen] = useState(false);
  const [isPaymentOptionsOpen, setPaymentOptionsOpen] = useState(false);
  const products = useSelector((state) => state.products.products);
  const product = products.find((product) => product.id === productId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products]);


  const [selectedColor, setSelectedColor] = useState(
    product && product.colors && product.colors.length > 0
      ? product.colors[0] 
      : ""
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
        <h1 className="nameDetail">{product.name}</h1>
        <div className="container-detail">
          <p className="priceDetail">{product.price} usd</p>
          <button className="btnDetail">Place in cart</button>
          <p className="description-detail">{product.description}</p>
          {/* <ul className="specifications">
            {product.specifications &&
              product.specifications.length > 0 &&
              product.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
          </ul> */}
            {product && product.colors && product.colors.length > 0 && (
            <div className="colors-detail">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className={`color-sample ${
                    color === selectedColor ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></span>
              ))}
            </div>
          )}
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
    </div>
  );
};

export default ProductDetail;
