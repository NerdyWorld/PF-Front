import React, { useContext, useEffect, useState } from 'react';
import styles from "./SeeAll.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import Footer from '../../../components/Footer/Footer';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import CollectionCard from '../../../components/Utils/CollectionCardd/CollectionCard';
import { Dropdown } from 'primereact/dropdown';
import { Translate } from 'react-auto-translate';
import { GlobalContext } from '../../../context/globalContext';
import { TailSpin } from 'react-loader-spinner';
import SeeAllFilters from '../../../components/Modals/SeeAllFilters/SeeAllFilters';



const SeeAll = () => {

  const { collection, category } = useParams();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    if(inView){

    }else{

    }
  }, [inView]);

  // ----------------
  
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { sortByName, sortByPriceDecrease, sortByPriceIncrease, setShowFilterModal, showFilteredProducts, finalFilteredProducts } = globalContext;

  const [filterBy, setFilterBy] = useState("Date");
  const [sortedItems, setSortedItems] = useState([]);
  const [resetingFilters, setResetingFilters] = useState(false);

  // FILTER DROPDOWN
  const filterSource = [
    { name: 'Date', code: 'Date' },
    { name: 'Name', code: 'Name' },
    { name: 'Price +', code: 'Price +' },
    { name: 'Price -', code: 'Price -' }
  ];

  const navigate = useNavigate();

  const state = useSelector(state => state.products);
  const { products, message } = state;

  const [productsObtained, setProductsObtained] = useState(false);
  const [brandProducts, setBrandProducts] = useState([]);
  const [offsetMin, setOffsetMin] = useState(0);
  const [offsetMax, setOffsetMax] = useState(20);

  const handleOffset = (e) =>{
    // PREVIOUS PAGE
    if(e.target.dataset.offset === "previous"){
      // IF ON PAGE 1, RETURN
      if(offsetMin === 0){
        return;
      }else{
        setOffsetMin(offsetMin - 20);
        setOffsetMax(offsetMax - 20);
      }



    // NEXT PAGE
    }else if(e.target.dataset.offset === "next"){
      // PAGINATION ON FILTERED PRODUCTS
      if(showFilteredProducts){
        if(finalFilteredProducts[offsetMax + 1]){
          setOffsetMin(offsetMin + 20)
          setOffsetMax(offsetMax + 20);
        }else{
          return;
        }

      // PAGINATION ON ALL PRODUCTS 
      }else if(!showFilteredProducts){
        if(brandProducts[offsetMax + 1]){
          setOffsetMin(offsetMin + 20)
          setOffsetMax(offsetMax + 20);

        // IF NO MORE PRODUCTS ON NEXT PAGE 
        }else{
          return;
        }
      }
    }
  };

  useEffect(() => {
    if(products.length){
      let array = [];
      if(!category){
        products.map(product => {
          if(product.brand.toLowerCase().trim().replaceAll(" ", "") === collection.toLowerCase()){
            array.push(product);
            
          }
        });
      }else{
        products.map(product => {
          if(product.brand.toLowerCase().trim().replaceAll(" ", "") === collection.toLowerCase() && product.categories.includes(category)){
            array.push(product);
          }
        });
      }

      setBrandProducts(array);
    }
  }, [products]);
  
  useEffect(() => {
    if(brandProducts.length){
      if(filterBy === "Date"){
        let parsedState = [...brandProducts];

        return setSortedItems(parsedState);
      }
      if(filterBy === "Name"){
        let parsedState = [...brandProducts];

        return setSortedItems(parsedState.sort(sortByName));
      }
      if(filterBy === "Price +"){
        let parsedState = [...brandProducts];

        return setSortedItems(parsedState.sort(sortByPriceDecrease));
      };
      if(filterBy === "Price -"){
        let parsedState = [...brandProducts];

        return setSortedItems(parsedState.sort(sortByPriceIncrease));
      };
    }
  }, [filterBy, brandProducts]);

  useEffect(() => {
    if(message === "Filters reseted"){
      setResetingFilters(true);
    }else{
      setResetingFilters(false);
    }
  }, [message]);

  useEffect(() => {
    if(brandProducts.length){
      setProductsObtained(true);
    }
  }, [brandProducts]);

  return ( 
    <div className={`${styles.wrapper} createAccount`}>
      <AccountHeader refHeader={ref} dark={true}/>
      <SeeAllFilters/>
      <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.goBack} onClick={()=> navigate(`/collection/${collection}`)}>
              <i className='bx bx-chevron-left'></i>
            </div>
              <h2>
              {
                collection === "louisVuitton" && "LOUIS VUITTON STORE"
              }
              {
                collection === "gucci" && "GUCCI STORE"
              }
              {
                collection === "fendi" && "FENDI STORE"
              }
              {
                collection === "dolce&Gabbana" && "DOLCE & GABBANA STORE"
              }
              {
                collection === "jimmyChoo" && "JIMMY CHOO STORE"
              }
              </h2>
          </div>
          <div className={styles.subTitle}>
              <span>All {category ? category : "Items"} <span className={styles.totalItems}>({showFilteredProducts ? finalFilteredProducts.length : brandProducts.length})</span></span>
              {
                category ? (
                  <div className={styles.filters}>
                    <Translate><span className={styles.filterBy}>Filter by</span></Translate>
                    <div className={`${styles.loginInputGenre} ${styles.loginInput}`}>
                      <div className='position-relative'>
                      <Dropdown value={{name: filterBy, code: filterBy}} onChange={(e) => setFilterBy(e.value.name)} optionLabel='name' options={filterSource} className='w-100' />
                        
                      </div>
                    </div>
                  </div>
                ):(
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
                )
              }
          </div>
          <div className={styles.items}>
              {
                showFilteredProducts ? (
                  finalFilteredProducts.map((el, index) => {
                    if(index >= offsetMin && index < offsetMax){
                      return <CollectionCard el={el} index={index}/>
                    }
                  })
                ):(
                    (productsObtained && brandProducts.length && !resetingFilters) ? (
                      sortedItems.length && sortedItems.map((el, index) => {
                        if(index >= offsetMin && index < offsetMax){
                          return <CollectionCard el={el} index={index}/>
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
 
export default SeeAll;