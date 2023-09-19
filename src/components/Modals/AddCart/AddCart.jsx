import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartItem } from "../../../features/user/userSlice";
import CartItemsList from "../../../views/Cart/CartList";

const CartButton = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.user.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleItem = () => {
    if (user) {
      const data = {
        userId: user.id,
        item: product,
      };
      dispatch(toggleCartItem(data));
    } else {
      console.log("User not logged in");
    }
  };

  const isInCart = cartItems?.some((item) => item.id === product.id);

  const addToCartAndOpenModal = () => {
    if (!isInCart) {
      handleToggleItem();
    }
    openModalHandler();
  };
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  let imageUrl = "";
  if (product.images && product.images.length) {
    const colorImageObj = product.images.find(
      (imgObj) => imgObj.color === product.selectedColor
    );
    if (colorImageObj) {
      imageUrl = colorImageObj.images[0];
    }
  }

  return (
       
      <div className="button-add-cart">
        <div className="button-cart-container-title">
          <img src={imageUrl} alt="Producto" />
          <div className="data-cart-price">
            <span className="name-cart">{product.name}</span>
            <span className="price-cart">usd {product.price}</span>
          </div>
        </div>
        <div className="cart-item-details-add">
          
            <span className="color-cart-add">Color: {product.selectedColor || "No color available"}</span>
          
          {product.selectedSize !== "Default" && (
            
              <span>Size: {product.selectedSize}</span>
            
          )}
      
        <button className="add-to-cart" onClick={addToCartAndOpenModal}>
        {isInCart ? "Add to shopping bag" : "Add to shopping bag"}
      </button>
      </div> 

      {isModalOpen && (
        <CartItemsList
          className={isModalOpen ? "open" : ""}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CartButton;
