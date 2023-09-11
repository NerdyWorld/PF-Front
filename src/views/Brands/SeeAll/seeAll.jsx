import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./SeeAll.module.css";
import SeeAllFilters from "../../../components/Modals/SeeAllFilters/SeeAllFilters";
import CollectionCard from "../../../components/Utils/CollectionCardd/CollectionCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { GlobalContext } from "../../../context/globalContext";

const SeeAll = () => {

    // CONTEXT API
    const globalContext = useContext(GlobalContext);
    const { finalFilteredProducts, setShowFilterModal, showFilteredProducts, setShowFilteredProducts } = globalContext;

    const { collection } = useParams();
    const [productsObtained, setProductsObtained] = useState(false);
    const [brandProducts, setbrandProducts] = useState();
    
    const state = useSelector(state => state);
    const { products, filterProducts: filteredProducts } = state.products;

    useEffect(() => {
        if(products.length){
            if(collection === "louisvuitton"){
                const brandProductsFound = [];

                products.map(el => {
                    if(el.brand === "Louis Vuitton"){
                        return brandProductsFound.push(el);
                    }
                });
                setProductsObtained(true);
                setbrandProducts(brandProductsFound);
            };
            if(collection === "gucci"){
                const brandProductsFound = [];

                products.map(el => {
                    if(el.brand === "Gucci"){
                        return brandProductsFound.push(el);
                    }
                });
                setProductsObtained(true);
                setbrandProducts(brandProductsFound);
            };
            if(collection === "fendi"){
                const brandProductsFound = [];

                products.map(el => {
                    if(el.brand === "Fendi"){
                        return brandProductsFound.push(el);
                    }
                });
                setProductsObtained(true);
                setbrandProducts(brandProductsFound);
            };
            if(collection === "dolcegabbana"){
                const brandProductsFound = [];

                products.map(el => {
                    if(el.brand === "Dolce & Gabbana"){
                        return brandProductsFound.push(el);
                    }
                });
                setProductsObtained(true);
                setbrandProducts(brandProductsFound);
            };
            if(collection === "jimmychoo"){
                const brandProductsFound = [];

                products.map(el => {
                    if(el.brand === "Jimmy Choo"){
                        return brandProductsFound.push(el);
                    }
                });
                setProductsObtained(true);
                setbrandProducts(brandProductsFound);
            };
        }
    }, [products, collection]);

    return (
        <div className={styles.wrapper}>
            <SeeAllFilters/>
            <div className={styles.filterButton}>
                <h3>
                    {
                        collection === "louisvuitton" ? "Louis Vuitton Store" : collection === "gucci" ? "Gucci Store" : collection === "fendi" ? "Fendi Store" : collection === "dolcegabbana" ? "Dolce & Gabbana Store" : collection === "jimmychoo" ? "Jimmy Choo Store" : ""
                    }
                </h3>
                <div className="d-flex align-items-center gap-3">
                    <i className="fa-solid fa-rotate-right" onClick={()=> setShowFilteredProducts(false)}></i>
                    <button onClick={()=> setShowFilterModal(true)}>
                        Filters
                        <i className='bx bx-sort-down'></i>
                    </button>
                </div>
            </div>
            {
                !productsObtained ? (
                    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                        <TailSpin
                            height="80"
                            width="80"
                            color="#1f1f1f"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                ):(
                    <div className={styles.container}>
                        {
                            showFilteredProducts ? (
                                finalFilteredProducts.map((el, index) => {
                                    return <CollectionCard el={el} index={index}/>
                                })
                            ):(
                                brandProducts.map((el, index) => {
                                    return <CollectionCard el={el} index={index}/>
                                })
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}


export default SeeAll;