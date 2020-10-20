import React  from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from './cartSlice';

import ProductSummary from '../Product/ProductSummary';
import Button from '../Button';

import './Cart.scss';

function Cart() {
  const cartItems = useSelector(selectCartItems);

  return (
    <>
      <div className="Cart">
        <h1>Twój koszyk</h1>
        {cartItems.length ?
          <div>
            {cartItems.map(({ product, quantity }, key) =>
                  <ProductSummary key={key} name={product.name} price={product.price} imgSrc={product.image.sourceUrl} />
            )}
          </div>
          :
          <div className="Cart-empty">
            <svg xmlns="http://www.w3.org/2000/svg" height="83px" viewBox="0 0 82.644 91.651" width="83px"><g fill="currentColor"><path d="m105.3 120.583a2.97 2.97 0 0 0 2.95 2.664 3.012 3.012 0 0 0 .309-.016 2.969 2.969 0 0 0 2.648-3.258l-1.369-13.249a2.969 2.969 0 0 0 -5.906.61z" transform="translate(-67.283 -62.867)"></path><path d="m150.285 123.23a3.012 3.012 0 0 0 .309.016 2.969 2.969 0 0 0 2.95-2.664l1.369-13.249a2.969 2.969 0 0 0 -5.907-.61l-1.369 13.249a2.969 2.969 0 0 0 2.648 3.258z" transform="translate(-93.687 -62.867)"></path><path d="m82.253 185.088a9.191 9.191 0 1 0 9.19 9.19 9.2 9.2 0 0 0 -9.19-9.19zm0 12.444a3.253 3.253 0 1 1 3.252-3.254 3.257 3.257 0 0 1 -3.252 3.254z" transform="translate(-48.644 -111.819)"></path><path d="m159.693 185.088a9.191 9.191 0 1 0 9.191 9.19 9.2 9.2 0 0 0 -9.191-9.19zm0 12.444a3.253 3.253 0 1 1 3.253-3.254 3.257 3.257 0 0 1 -3.253 3.254z" transform="translate(-95.428 -111.819)"></path><path d="m93.4 59.345a2.969 2.969 0 0 0 -2.349-1.153h-59.179l-2.485-9.556a2.969 2.969 0 0 0 -2.874-2.222h-12.168a2.969 2.969 0 0 0 0 5.938h9.873l2.465 9.479c.012.053.026.106.041.158l9.167 35.25a2.969 2.969 0 0 0 2.874 2.222h43.1a2.969 2.969 0 0 0 2.874-2.222l9.188-35.33a2.97 2.97 0 0 0 -.527-2.564zm-13.833 34.178h-38.507l-7.644-29.393h53.8z" transform="translate(-11.376 -28.041)"></path><path d="m89.978 30.872a2.969 2.969 0 1 0 4.2-4.2l-9.337-9.333a2.969 2.969 0 0 0 -4.2 4.2z" transform="translate(-52.696 -9.95)"></path><path d="m154.643 31.742a2.96 2.96 0 0 0 2.1-.87l9.323-9.332a2.969 2.969 0 0 0 -4.2-4.2l-9.323 9.332a2.969 2.969 0 0 0 2.1 5.067z" transform="translate(-96.136 -9.952)"></path><path d="m130.476 19.124a2.969 2.969 0 0 0 2.969-2.968v-13.186a2.969 2.969 0 0 0 -2.964-2.97 2.969 2.969 0 0 0 -2.969 2.968v13.186a2.969 2.969 0 0 0 2.964 2.97z" transform="translate(-81.536)"></path></g></svg>
            <div className="Cart-empty-text">Twój koszyk jest pusty</div>
            <Link to="/store">
              <Button>Kontynuuj zakupy</Button>
            </Link>
          </div>
        }
      </div>
    </>
  )
}

export default Cart;