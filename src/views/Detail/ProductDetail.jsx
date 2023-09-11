import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="detail-container">
      <div className="image-section">
        {product.imageURLs.map((url, index) => (
          <img key={index} src={url} alt={`${product.name}-${index}`} className="product-image" />
        ))}
      </div>
      <div className="info-section">
        <h1 className='nameDetail'>{product.name}</h1>
        <div className='container-detail'>
        <p className='priceDetail'>{product.price}</p>
        <button className='btnDetail'>Place in cart</button>
        <p>{product.description}</p>
        <ul className="specifications">
          {product.specifications.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        <div className="colors">
          {product.colors.map((color, index) => (
            <span key={index} className="color-sample" style={{ backgroundColor: color }}></span>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};


export default ProductDetail;