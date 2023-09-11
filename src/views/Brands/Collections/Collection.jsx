import React, { useEffect, useState } from "react";
import CarouselCollection from "./carouselCollection";
import { useNavigate, useParams } from "react-router-dom";
import { brandsData } from "./brandsData";
import { useSelector } from "react-redux";


const Collection = () => {
  const navigate = useNavigate()
  const { name } = useParams();
  const brand = brandsData[name];
  const state = useSelector(state => state.products);
  const { products } = state;

  const [brandCards, setbrandCards] = useState([]);


  useEffect(() => {
    if(name === "louisvuitton"){
      let array = [];
      products.map(el => {
        if(el.brand === "Louis Vuitton"){
          array.push(el);
        }
      })
      setbrandCards(array)
    }
    if(name === "gucci"){
      let array = [];
      products.map(el => {
        if(el.brand === "Gucci"){
          array.push(el);
        }
      })
      setbrandCards(array)
    }
    if(name === "fendi"){
      let array = [];
      products.map(el => {
        if(el.brand === "Fendi"){
          array.push(el);
        }
      })
      setbrandCards(array)
    }
    if(name === "dolcegabbana"){
      let array = [];
      products.map(el => {
        if(el.brand === "Dolce & Gabbana"){
          array.push(el);
        }
      })
      setbrandCards(array)
    }
    if(name === "jimmychoo"){
      let array = [];
      products.map(el => {
        if(el.brand === "Jimmy Choo"){
          array.push(el);
        }
      })
      setbrandCards(array)
    }
  }, [name]);

return(
  <div className="collection-container">
    <p className='seeAll-collection' onClick={() => navigate(`/seeAll/${name}`)}>See All</p>
    <h2 className="collection-brandName">{brand.brandName}</h2>
    <h3 className="collection-name">{brand.name}</h3>
    <CarouselCollection key={name} collections={brand.collections} brandCards={brandCards} />
  </div>
)
}

export default Collection;
