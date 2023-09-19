import React, { useEffect } from 'react';
import ProductDetail from './ProductDetail';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productSlice';

const Detail = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const { id, colors } = useParams();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products]);


  const productToDisplay = products.find((product) => product.id === id);

  return (
    <div>
       {productToDisplay ? <ProductDetail productId={id} initialSelectedColor={colors}/> : <div>Loading...</div>}
    </div>
  );
}

export default Detail;