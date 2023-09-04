import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "./favoritesSlice";

function Favorites() {
  const favoriteProducts = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div>
      <h1>Mis Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p>No tienes productos en tus favoritos.</p>
      ) : (
        favoriteProducts.map((product) => (
          <div key={product.id}>
            {/* Renderiza información del producto */}
            <h2>{product.name}</h2>
            {/* Agrega un botón para eliminar el producto de favoritos */}
            <button onClick={() => handleRemoveFromFavorites(product.id)}>
              Eliminar de favoritos
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
