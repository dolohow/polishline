import React from 'react';

import './ProductSummary.scss';

function ProductSummary({ name, price, imgSrc }) {
  return (
    <div className="ProductSummary">
      <img alt="zdjęcie produktu" src={imgSrc} />
      <div className="ProductSummary-details">
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </div>
  )
}

export default ProductSummary;