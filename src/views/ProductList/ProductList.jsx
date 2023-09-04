import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProductsToShow,
  applyFilters,
  sortByPriceAscending,
  sortByPriceDescending,
} from "../../features/FendiSlice/FendiSlice";
import styles from "./ProductList.module.css";
import { useNavigate, Link } from "react-router-dom";
import convert from "color-convert";
import stringSimilarity from "string-similarity";

function ProductList({ productsData, category, marca }) {
  const productsToShow = useSelector((state) => state.fendi.productsToShow);
  const dispatch = useDispatch();

  const [colorFilter, setColorFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [sortingType, setSortingType] = useState("asc");
  const [sortingValue, setSortingValue] = useState("price");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImages, setHoveredImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Seguimiento de la imagen actual
  const [intervalId, setIntervalId] = useState(null);

  // Función para calcular el grupo en función de la similitud
  const calculateGroupName = (models) => {
    const commonWords = [];

    // Obtén todas las palabras comunes entre los modelos
    models.forEach((model) => {
      const words = model.split(" "); // Divide el modelo en palabras
      words.forEach((word) => {
        // Si la palabra no está en la lista de palabras comunes y aparece en todos los modelos, agrégala
        if (
          !commonWords.includes(word) &&
          models.every((otherModel) => otherModel.includes(word))
        ) {
          commonWords.push(word);
        }
      });
    });

    // Convierte las palabras comunes en un solo string separado por espacios
    return commonWords.join(" ");
  };

  const threshold = 0.6; // Umbral de similitud, puedes ajustarlo según tus necesidades

  const groupModels = (models) => {
    const grouped = [];

    models.forEach((model) => {
      let foundGroup = false;

      // Intenta encontrar un grupo existente para el modelo actual
      for (let i = 0; i < grouped.length; i++) {
        const groupModel = grouped[i][0]; // Tomar un modelo de referencia del grupo

        // Calcula la similitud entre el modelo actual y el modelo de referencia
        const similarity = stringSimilarity.compareTwoStrings(
          model,
          groupModel
        );

        if (similarity >= threshold) {
          // Si la similitud es suficiente, agrega el modelo al grupo existente
          grouped[i].push(model);
          foundGroup = true;
          break;
        }
      }

      if (!foundGroup) {
        // Si no se encontró un grupo existente, crea un nuevo grupo
        grouped.push([model]);
      }
    });

    return grouped;
  };

  // Luego, en la función donde obtienes los modelos únicos, usa la función groupModels
  const uniqueModels = groupModels(productsData.map((product) => product.name));
  const uniqueModelsWithGroupNames = uniqueModels.map((models) => {
    const groupName = calculateGroupName(models);
    return { groupName, models };
  });

  // ... más código de tu componente ...

  const uniqueColors = [
    ...new Set(
      productsData
        .filter((product) => {
          const modelMatch =
            !modelFilter ||
            uniqueModelsWithGroupNames
              .find((modelData) => modelData.groupName === modelFilter)
              ?.models.includes(product.name);
          return !modelFilter || modelMatch;
        })
        .flatMap((product) => product.colors)
    ),
  ];

  const handleColorChange = (e) => {
    setColorFilter(e.target.value);
  };

  const handleModelChange = (e) => {
    setModelFilter(e.target.value);
  };

  useEffect(() => {
    const filteredProducts = productsData.filter((product) => {
      const colorMatch = !colorFilter || product.colors.includes(colorFilter);
      const modelMatch =
        !modelFilter ||
        uniqueModelsWithGroupNames
          .find((modelData) => modelData.groupName === modelFilter)
          ?.models.includes(product.name);
      return colorMatch && modelMatch;
    });

    if (sortingType === "asc") {
      if (sortingValue === "price") {
        dispatch(sortByPriceAscending(true));
      }
    } else {
      if (sortingValue === "price") {
        dispatch(sortByPriceDescending(true));
      }
    }
    dispatch(applyFilters(filteredProducts));
  }, [
    colorFilter,
    modelFilter,
    dispatch,
    productsData,
    sortingType,
    sortingValue,
  ]);

  const filteredProducts = useSelector((state) => state.fendi.filteredProducts);
  const displayedProducts = filteredProducts.slice(0, productsToShow);

  const loadMoreProducts = () => {
    const newProductsToShow = productsToShow + 20;
    dispatch(setProductsToShow(newProductsToShow));
  };

  const handleImageHover = (product) => {
    if (product.images[0].images.length > 1) {
      setHoveredImages(product.images[0].images);
      startImageCarousel();
    } else {
      setHoveredImages(product.images[0].images.slice(0, 3));
      stopImageCarousel();
    }
    setIsHovered(true);
  };

  const handleImageMouseLeave = () => {
    stopImageCarousel();
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const startImageCarousel = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === hoveredImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Cambia la imagen cada 2 segundos (ajusta según lo necesario)
      setIntervalId(id);
    }
  };

  const stopImageCarousel = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtroycards}>
        <div
          className={
            displayedProducts.length > 4
              ? styles.filtros
              : displayedProducts.length === 1
              ? `${styles.filtros} ${styles.extra1}`
              : displayedProducts.length === 2
              ? `${styles.filtros} ${styles.extra2}`
              : displayedProducts.length === 3
              ? `${styles.filtros} ${styles.extra3}`
              : `${styles.filtros} ${styles.extra}`
          }
        >
          <div className={styles.filter}>
            <label htmlFor="modelFilter">Modelo:</label>
            <select
              id="modelFilter"
              onChange={handleModelChange}
              value={modelFilter}
            >
              <option value="">Todos</option>
              {uniqueModelsWithGroupNames.map((model, index) => (
                <option key={index} value={model.groupName}>
                  {model.groupName}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filter}>
            <label htmlFor="colorFilter">Color:</label>
            <select
              id="colorFilter"
              onChange={handleColorChange}
              value={colorFilter}
            >
              <option value="">Todos</option>
              {uniqueColors.map((color, index) => (
                <option key={index} value={color}>
                  {color.includes("#") ? convert.hex.keyword(color) : color}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.containerProds}>
          <div className={styles.tittleOrd}>
            <div className={styles.tittle}>
              <h2>{displayedProducts.length > 0 ? category : null}</h2>
            </div>
            <div className={styles.filterOrder}>
              {displayedProducts.length > 2 ? (
                <div>
                  <label>Sort by price:</label>
                  <select
                    value={`${sortingValue}-${sortingType}`}
                    onChange={(e) => {
                      const [value, type] = e.target.value.split("-");
                      setSortingValue(value);
                      setSortingType(type);
                    }}
                  >
                    <option value="price-asc">Low to high</option>
                    <option value="price-desc">High to low</option>
                  </select>
                </div>
              ) : null}
            </div>
          </div>
          <div
            className={
              displayedProducts.length > 5 ? styles.productos : styles.products
            }
          >
            {displayedProducts.map((product, index) => (
              <div
                className={
                  marca === "Louis Vuitton"
                    ? `${styles.card} ${styles.cardLV}`
                    : styles.card
                }
                key={index}
                onMouseEnter={() => handleImageHover(product)}
                onMouseLeave={handleImageMouseLeave}
              >
                {/* Renderiza las imágenes del producto */}
                <ImageCarousel product={product} />
                {/* Renderiza el nombre del producto */}
                <p className={styles.marca}>{marca}</p>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.price}>${product.price}</p>
                <button className={styles.btnBuyNow}>Buy now</button>
                <button className={styles.btnAddtoCart}>🛒</button>
              </div>
            ))}
          </div>
          {/* Botón para cargar más productos */}
          {productsToShow < filteredProducts.length && (
            <div className={styles.buttoncontainer}>
              <button className={styles.button} onClick={loadMoreProducts}>
                View ({filteredProducts.length - productsToShow}) more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    if (product) {
      // Esta función se ejecutará cada vez que cambie `product.images`
      setCurrentImageIndex(0); // Reiniciar a la primera imagen cuando cambian las imágenes
    }
  }, [product]);
  const startImageCarousel = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        if (product.images.length > 1) {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
          );
        } else {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images[0].images.length - 1
              ? 0
              : prevIndex + 1
          );
        }
      }, 1000); // Cambia la imagen cada 2 segundos (ajusta según lo necesario)
      setIntervalId(id);
    }
  };

  const stopImageCarousel = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div onMouseEnter={startImageCarousel} onMouseLeave={stopImageCarousel}>
      <Link to="/detail/id">
        {product.images.length > 1 ? (
          <img
            src={product.images[currentImageIndex].images[0]}
            alt={product.name}
          />
        ) : (
          <img
            src={product.images[0].images[currentImageIndex]}
            alt={product.name}
          />
        )}
      </Link>
    </div>
  );
}

export default ProductList;
