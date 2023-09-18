import React, { useContext, useEffect, useState } from 'react';
import styles from "./Store.module.css"; 
import AccountHeader from '../../components/AccountHeader/AccountHeader';
import Footer from '../../components/Footer/Footer';
import { Dropdown } from 'primereact/dropdown';
import { Translate } from 'react-auto-translate';
import { GlobalContext } from '../../context/globalContext';
import CollectionCard from '../../components/Utils/CollectionCardd/CollectionCard';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import SeeAllFilters from '../../components/Modals/SeeAllFilters/SeeAllFilters';
import { useLocation } from 'react-router-dom';
import { filterProducts } from '../../features/products/productSlice';


const OurStore = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { sortByName, sortByPriceDecrease, sortByPriceIncrease, setShowFilterModal, showFilteredProducts, finalFilteredProducts, setShowFilteredProducts, setFinalFilteredProducts } = globalContext;

  const location = new URLSearchParams(document.location.search);
  const categoryQuery = location.get("category");

  const dispatch = useDispatch();
  const state = useSelector(state => state.products);
  const { products, message, filterProducts: filteredProducts } = state;

  
  const [filterBy, setFilterBy] = useState("Date");
  const [sortedItems, setSortedItems] = useState([]);
  const [resetingFilters, setResetingFilters] = useState(false);
  
  
  const [filtersEmpty, setFiltersEmpty] = useState(false);
  const [productsObtained, setProductsObtained] = useState(false);
  const [offsetMin, setOffsetMin] = useState(0);
  const [offsetMax, setOffsetMax] = useState(20);
  const [offsetNumber, setOffsetNumber] = useState(20);
  const [itemsPerPage, setItemsPerPage] = useState(offsetNumber);
  const [allProducts, setAllProducts] = useState([]);

  // FILTER DROPDOWN
  const filterSource = [
    { name: 'Date', code: 'Date' },
    { name: 'Name', code: 'Name' },
    { name: 'Price +', code: 'Price +' },
    { name: 'Price -', code: 'Price -' }
  ];

  // ITEMS PER PAGE DROPDOWN
  const itemsPerPageSource = [
    { name: '20 Items', code: '20 Items' },
    { name: '30 Items', code: '30 Items' },
    { name: '40 Items', code: '40 Items' },
    { name: '50 Items', code: '50 Items' }
  ];

  const handleOffset = (e) =>{
    // PREVIOUS PAGE
    if(e.target.dataset.offset === "previous"){
      // IF ON PAGE 1, RETURN
      if(offsetMin === 0){
        return;
      }else{
        setOffsetMin(offsetMin - offsetNumber);
        setOffsetMax(offsetMax - offsetNumber);
      }



    // NEXT PAGE
    }else if(e.target.dataset.offset === "next"){
      // PAGINATION ON FILTERED PRODUCTS
      if(showFilteredProducts){
        if(finalFilteredProducts[offsetMax + 1]){
          setOffsetMin(offsetMin + offsetNumber)
          setOffsetMax(offsetMax + offsetNumber);
        }else{
          return;
        }

      // PAGINATION ON ALL PRODUCTS 
      }else if(!showFilteredProducts){
        if(allProducts[offsetMax + 1]){
          setOffsetMin(offsetMin + offsetNumber)
          setOffsetMax(offsetMax + offsetNumber);

        // IF NO MORE PRODUCTS ON NEXT PAGE 
        }else{
          return;
        }
      }
    }
  };

  const handleItemsPerPage = (value) =>{
    if(value === "30 Items"){
      setItemsPerPage(value);
      setOffsetNumber(30);
    }else if(value === "40 Items"){
      setItemsPerPage(value)
      setOffsetNumber(40);
    }else if(value === "50 Items"){
      setItemsPerPage(value)
      setOffsetNumber(50)
    }else{
      setItemsPerPage(value)
      setOffsetNumber(20);
    }
  };

  useEffect(() => {
    if(showFilteredProducts){
      if(finalFilteredProducts.length){
        if(filterBy === "Date"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...finalFilteredProducts];
  
          return setFinalFilteredProducts(filteredProducts);
        }
        if(filterBy === "Name"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...finalFilteredProducts];
  
          return setFinalFilteredProducts(parsedState.sort(sortByName));
        }
        if(filterBy === "Price +"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...finalFilteredProducts];
  
          return setFinalFilteredProducts(parsedState.sort(sortByPriceDecrease));
        };
        if(filterBy === "Price -"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...finalFilteredProducts];
  
          return setFinalFilteredProducts(parsedState.sort(sortByPriceIncrease));
        };
      };
    }else{
      if(allProducts.length){
        if(filterBy === "Date"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...allProducts];
  
          return setSortedItems(parsedState);
        }
        if(filterBy === "Name"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...allProducts];
  
          return setSortedItems(parsedState.sort(sortByName));
        }
        if(filterBy === "Price +"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...allProducts];
  
          return setSortedItems(parsedState.sort(sortByPriceDecrease));
        };
        if(filterBy === "Price -"){
          setResetingFilters(true);
          setTimeout(()=>{
            setResetingFilters(false);
          },1500);
          let parsedState = [...allProducts];
  
          return setSortedItems(parsedState.sort(sortByPriceIncrease));
        };
      };
    }
  }, [filterBy, allProducts, finalFilteredProducts, showFilteredProducts]);


  useEffect(() => {
    if(allProducts.length){
      setProductsObtained(true);
    }
  }, [allProducts]);


  useEffect(() => {
    if(message === "Products filtered" && filteredProducts.length){
      setFinalFilteredProducts(filteredProducts);
      setOffsetMin(0);
      setOffsetMax(20);
      setOffsetNumber(20);
    };

    if(message === "Products filtered" && !filteredProducts.length){
      setFiltersEmpty(true);
    };

    if(message === "Filters reseted"){
      setResetingFilters(true);
      setFinalFilteredProducts(allProducts);
    }else{
      setResetingFilters(false);
    };

  }, [message]);


  useEffect(() => {
    if(categoryQuery){
      
      dispatch(filterProducts({
        brand: "",
        category: categoryQuery,
        color: "",
        priceMin: "",
        priceMax: ""
      }));
      
      setShowFilteredProducts(true);
      setAllProducts(filteredProducts);
      
    }else{
      if(products.length){
        setAllProducts(products);
      };
    }
  }, [products, categoryQuery]);


  useEffect(() => {
      if(offsetMin === 0){
        return setOffsetMax(offsetMax + (offsetNumber - offsetMax));
      };
      
      setOffsetMin(0);
      setOffsetMax(offsetNumber);

  }, [offsetNumber]);


  return ( 
    <div className={`${styles.wrapper} createAccount`}>
      <AccountHeader dark={true} noBorder={true}/>
      <SeeAllFilters ourStore={true} query={categoryQuery}/>
      <div className={styles.container}>

        {/* TITLE */}
        <div className={styles.title}>
          <h2>OUR STORE</h2>
        </div>

        {/* SUBHEADER */}
        <div className={styles.subHeader}>
          {/* LENGTH & SORTER */}
          <div className={styles.subHeaderLeft}>
            <span className={styles.itemsLength}>All Items <span className={styles.totalItems}>({showFilteredProducts ? finalFilteredProducts.length : allProducts.length})</span></span>
          </div>

          {/* FILTER & PAGINATION */}
          <div className={styles.filterContainer}>
            <div className={styles.pagination}>
              <i data-offset={"previous"} className='bx bx-sm bx-chevron-left' onClick={handleOffset}></i>
              <span>
                {
                  `${offsetMin} - ${offsetMax}`
                }
              </span>
              <i data-offset={"next"} className='bx bx-sm bx-chevron-right' onClick={handleOffset}></i>
            </div>
            <div className={styles.filterButton}>
              <button onClick={()=> setShowFilterModal(true)}>
                  Filters
                  <i className='bx bx-sort-down'></i>
              </button>
            </div>
          </div>
        </div>

        {/* SORT BY */}
        <div className={styles.sortBy}>
          <div className={styles.filters}>
            <div className={`${styles.loginInputGenre} ${styles.loginInput}`}>
              <div className={styles.dropdownDiv}>
                <Dropdown value={{name: filterBy, code: filterBy}} onChange={(e) => setFilterBy(e.value.name)} optionLabel='name' options={filterSource} className='w-100' />
              </div>
            </div>
          </div>
          <div className={styles.filters2}>
            <div className={`${styles.loginInputGenre} ${styles.loginInput}`}>
              <div className={styles.dropdownDiv}>
                <Dropdown value={{name: itemsPerPage, code: itemsPerPage}} onChange={(e)=> handleItemsPerPage(e.value.name)} optionLabel='name' options={itemsPerPageSource} className='w-100' placeholder='Items per page' />
              </div>
            </div>
          </div>
        </div>
          
        <div className={styles.items}>
            {
              showFilteredProducts ? (
                finalFilteredProducts.length && finalFilteredProducts.map((el, index) => {
                  if(index >= offsetMin && index < offsetMax){
                    return <CollectionCard key={index} el={el} index={index} ourStore={true}/>
                  }
                })
              ):(
                  (productsObtained && allProducts.length && !resetingFilters) ? (
                    sortedItems.length && sortedItems.map((el, index) => {
                      if(index >= offsetMin && index < offsetMax){
                        return <CollectionCard key={index} el={el} index={index} ourStore={true}/>
                      }
                    })
                  ):(
                    <div className={styles.tailSpin}>
                      <TailSpin
                        height="80"
                        width="80"
                        color="#19110b"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  )
              )
            }
        </div>
      </div>
      <Footer/>
    </div>
   );
}
 
export default OurStore;