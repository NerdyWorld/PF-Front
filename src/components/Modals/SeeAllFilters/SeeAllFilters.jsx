import React, { useContext, useRef, useState } from 'react';
import styles from "./SeeAllFilters.module.css";
import { Dropdown } from 'primereact/dropdown';
import { Translate } from 'react-auto-translate';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProductMessages, filterProducts } from '../../../features/products/productSlice';
import { TailSpin } from 'react-loader-spinner';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { GlobalContext } from '../../../context/globalContext';


const SeeAllFilters = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setFinalFilteredProducts, setShowFilteredProducts, showFilterModal, setShowFilterModal } = globalContext;

  const refToast = useRef();
  const state = useSelector(state => state);
  const { colors, message, filterProducts: filteredProducts } = state.products;
  const dispatch = useDispatch();
  const { collection } = useParams();

  const [category, setCategory] = useState("");
  const [colorSelected, setColorSelected] = useState("");
  const [price, setPrice] = useState({
    priceMin: null,
    priceMax: null
  });

  const handlePrices = (e) =>{
    if(message === "Products filtered"){
      dispatch(clearProductMessages());
      setPrice({
        ...price,
        [e.target.name]: e.target.value
      });
    }else{
      setPrice({
        ...price,
        [e.target.name]: e.target.value
      })
    }
  };

  const handleFilter = () =>{
    if(message === "Products filtered"){
      if(filteredProducts.length === 0){
        return refToast.current.show({life: 3000, severity: "warn", summary: "We're sorry!", detail: `There is no products to show`});
      }else{
        setShowFilteredProducts(true);
        setFinalFilteredProducts(filteredProducts);
        setShowFilterModal(false);
        dispatch(clearProductMessages());
      }
    };
    if((!category || category === "Please select a category") && !colorSelected && (!price.priceMin || !price.priceMax)){
      return refToast.current.show({life: 4000, severity: "warn", summary: "We're sorry!", detail: `You must complete at least one field`});
    }else{
      dispatch(filterProducts({
        brand: collection === "louisvuitton" ? "Louis Vuitton" : collection === "gucci" ? "Gucci" : collection === "fendi" ? "Fendi" : collection === "dolcegabbana" ? "Dolce & Gabbana" : collection === "jimmychoo" ? "Jimmy Choo" : "",
        category: category === "Please select a category" ? "" : category,
        color: colorSelected,
        priceMin: price.priceMin || "",
        priceMax: price.priceMax || ""
      }))
    }
  };

  const handleColor = (color) =>{
    if(colorSelected === color){
      if(message === "Products filtered"){
        dispatch(clearProductMessages());
        setColorSelected("");
      }else{
        setColorSelected("");
      }
    }else{
      if(message === "Products filtered"){
        dispatch(clearProductMessages());
        setColorSelected(color);
      }else{
        setColorSelected(color);
      }
    }
  };

  const handleCategory = (category) =>{
    if(message === "Products filtered"){
      dispatch(clearProductMessages());
      setCategory(category);
    }else{
      setCategory(category);
    }
  };

  const handleReset = () =>{
    setShowFilteredProducts(false);
    setCategory("");
    setColorSelected("");
    setPrice({
      priceMin: null,
      priceMax: null
    });
    dispatch(clearProductMessages());
  };

  const categorySource = [
    {name: "Please select a category", code: "Please select a category"},
    {name: "Bags", code: "Bags"},
    {name: "Accessories", code: "Accessories"},
    {name: "Heels", code: "Heels"},
    {name: "Sunglasses", code: "Sunglasses"},
    {name: "Sneakers", code: "Sneakers"}
  ];

  return ( 
      <article className={`filterSeeAll ${styles.article}`} style={{right: showFilterModal ? "0px" : "-100vw", opacity: showFilterModal ? 1 : 0}}>
        <Toast ref={refToast} position='top-left'></Toast>
        <div className={styles.close}>
          <i className="fa-solid fa-rotate-right" onClick={handleReset}></i>
          <i className="fa-solid fa-xmark" onClick={()=> setShowFilterModal(false)}></i>
        </div>
        <div className={styles.div}>
          <h3>
            {
                collection === "louisvuitton" ? "LV Filtering" : collection === "gucci" ? "Gucci Filtering" : collection === "fendi" ? "Fendi Filtering" : collection === "dolcegabbana" ? "D&G Filtering" : collection === "jimmychoo" ? "Jimmy Choo Filtering" : ""
            }
          </h3>
          <div className={styles.loginInput}>
            <span><Translate>Category <span className={styles.optional}>(optional)</span></Translate></span>
              <div className='position-relative'>
                <Dropdown placeholder='Please select a category' value={{name: category, code: category}} onChange={(e) => handleCategory(e.value.name)} optionLabel='name' options={categorySource} className="w-full md:w-14rem" />
              </div>
          </div>
          <div className={styles.loginInput} style={{marginTop:"2.5rem"}}>
            <span><Translate>Color <span className={styles.optional}>(optional)</span></Translate></span>
            <div className={styles.colors}>
              {
                colors.map((color, index) => {
                  return <span key={index} style={{backgroundColor: color.name}} className={`${styles.colorSpan} ${colorSelected === color.name && styles.colorSelected}`} onClick={()=> handleColor(color.name)}></span>
                })
              }
            </div>
          </div>
          <div className={styles.loginInput} style={{marginTop:"2.5rem"}}>
            <span><Translate>Price <span className={styles.optional}>(optional)</span></Translate></span>
              <div className={styles.price}>
                <input type="number" placeholder='Min' name='priceMin' onChange={handlePrices} />
                <i className="fa-solid fa-arrow-right-arrow-left fa-sm"></i>
                <input type="number" placeholder='Max' name='priceMax' onChange={handlePrices}/>
              </div>
          </div>
          <div className={styles.button} onClick={handleFilter}>
            <button className='d-flex justify-content-center align-items-center'>
              {
                message === "Filtering products" ? <TailSpin
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : message === "Products filtered" ? `Show ${filteredProducts.length} products` : "Search"
              }
            </button>
          </div>
        </div>
      </article>
   );
}
 
export default SeeAllFilters;