import { useDispatch, useSelector } from "react-redux";
import CartButton from "../../components/Modals/AddCart/AddCart";

import { RiDeleteBin6Line } from "react-icons/ri";
import { toggleCartItem } from "../../features/user/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartItemsList = ({ closeModal }) => {
  const cartItems = useSelector((state) => state.user.cart) || [];
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".cart-drawer")) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  const handleToggleItem = (productToRemove) => {
    if (user) {
      const data = {
        userId: user.id,
        item: productToRemove,
      };
      dispatch(toggleCartItem(data));
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <div className="cart-container-add">         
          <h4 className="shop-cart-prod">ADDED TO SHOPPING BAG</h4> 
          <button className="close-modal" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="checkout-cart-list">
          <button className="checkout-cart">Checkout</button>
          <button className="checkout-cart" onClick={() => navigate('home')}>View more collections</button>
        </div>
        {cartItems.map((item, index) => {
          console.log("Rendering item:", item);
          let imageUrl = "";

          if (!item) {
            console.error("Ítem indefinido:", item);
            return null;
          }

          if (item.images && item.images.length) {
            const colorImageObj = item.images.find(
                (imgObj) => imgObj.color === item.selectedColor
              );
            if (colorImageObj) {
              imageUrl = colorImageObj.images[0];
            }
          }
          return (
            <div className="cart-item" key={index}>
                 
              <div className="cart-container-title">
                <img className='image-cart-item' src={imageUrl} alt="Producto" />
                <div className="data-cart-price">
                  <span className="name-cart">{item.name}</span>
                  <span className="price-cart">usd {item.price}</span>
                </div>
              </div>
              <div className="cart-item-details">
                <li>
                  <span>
                    Color: {item.selectedColor || "No color available"}
                  </span>
                </li>
                {item.selectedSize !== "Default" && (
                  <li>
                    <span>Size: {item.selectedSize}</span>
                  </li>
                )}
                {/* <li>
                  <span>Quantity: {item.quantity}</span>
                </li> */}
                <div className="btnDelete">
                  <RiDeleteBin6Line
                    className="btn-delete"
                    onClick={() => handleToggleItem(item)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      
      </div>
    </div>
  );
};

export default CartItemsList;
