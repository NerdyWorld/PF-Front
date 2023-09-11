import React from 'react';
import ProductDetail from './ProductDetail';

const Detail = () => {
  const product = {
    imageURLs: [
      '/images/imgGucci.webp',
      '/images/imgGucci2.webp',
      '/images/imgGucci3.webp',
      '/images/imgGucci4.webp'
    ],
    name: 'Product name',
    price: '2490 usd',
    description: 'Description',
    specifications: ['Especification 1', 'Especification 2', 'Especification 3'],
    colors: ['#FF5733', '#33FF57', '#3357FF']
  };

  return (
    <ProductDetail product={product} />
  );
}

export default Detail;