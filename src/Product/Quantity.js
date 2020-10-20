import React, { useState } from 'react';

import './Quantity.scss';

function Quantity({ value, onChange }) {
  const [quantity, setQuantity] = useState(value || 1);

  const updateQuantity = newValue => {
    const val = parseInt(newValue);
    if (isNaN(val))
      return
    if (val < 1)
      return;
    setQuantity(val);
    onChange(val);
  }

  return (
    <div className="Quantity">
      <button onClick={() => updateQuantity(quantity - 1)} className="decrease" type="button" >-</button>
      <input onChange={(e) => updateQuantity(e.target.value)} type="number" min="1" value={quantity}></input>
      <button className="increase" type="button" onClick={() => updateQuantity(quantity + 1)}>+</button>
    </div>
  )
}

export default Quantity;