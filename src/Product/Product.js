import React, { useRef, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { find, remove } from 'lodash';

import NotFound from '../NotFound';
import Loader from '../Loader';

import './Product.scss';

const GET_PRODUCT = gql`
  query product($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    name
    description
    galleryImages {
      nodes {
        mediaItemUrl
        srcSet(size: WOOCOMMERCE_SINGLE)
        sourceUrl(size: WOOCOMMERCE_GALLERY_THUMBNAIL)
      }
    }
    ... on SimpleProduct {
      price
      stockStatus
    }
    ... on VariableProduct {
      defaultAttributes {
        nodes {
          name
          value
        }
      }
      variations {
        nodes {
          name
          price
          stockStatus
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
          }
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
      paColors {
        nodes {
          name
          slug
        }
      }
      paSizes {
        nodes {
          name
          slug
        }
      }
    }
  }
}
`

function Color({ value, color, selected, onChange }) {
  return (
    <>
      <input id={`color-${color}`} onChange={onChange} type="radio" name="color" value={value} />
      <label htmlFor={`color-${color}`} className={selected ? "selected" : ""}>
        <svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="15" strokeWidth="2"></circle>
            <g transform="translate(2 2)">
              <circle cx="14" cy="14" fill={color} fillRule="evenodd" r="12"></circle>
              <circle cx="14" cy="14" r="13" stroke="#fff" strokeWidth="2"></circle>
            </g>
          </g>
        </svg>
      </label>
    </>
  )
}

function Size({ value, selected, onChange }) {
  return (
    <li className={selected ? "selected" : ""}>
      <input onChange={onChange} id={`size-${value}`} type="radio" name="size" value={value} />
      <label htmlFor={`size-${value}`}>
        <span>{value}</span>
      </label>
    </li>
  )
}

function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = value => {
    const val = parseInt(value);
    if (isNaN(val))
      return
    if (value < 1)
      return;
    setQuantity(val);
  }

  return (
    <div className="Product-quantity">
      <button onClick={() => updateQuantity(quantity - 1)} className="decrease" type="button" >-</button>
      <input onChange={(e) => updateQuantity(e.target.value)} type="number" min="1" value={quantity}></input>
      <button className="increase" type="button" onClick={() => updateQuantity(quantity + 1)}>+</button>
    </div>
  )
}

function Modal({ name, price, imgSrc, onButtonClose }) {
  const modal = useRef(null);

  useEffect(() => {
    modal.current.classList.add('Product-checkout-modal-show');
  })

  return (
    <div ref={modal} className="Product-checkout-modal">
      <div className="Product-checkout-modal-header">
        <button onClick={onButtonClose}>
          <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 16.351 16.351" width="16px"><clipPath><path d="m0 0h16.351v16.351h-16.351z"></path></clipPath><g clipPath="url(#a)" fill="currentColor"><path d="m0 0h21.96v1.165h-21.96z" transform="matrix(.70710678 .70710678 -.70710678 .70710678 .824243 .000101)"></path><path d="m0 0h21.96v1.165h-21.96z" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 16.350981 .823202)"></path></g></svg>
        </button>
      </div>
      <div className="Product-checkout-modal-content">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 0 37.212 37.213" width="38px"><path d="m16.7 28.463-7.9-8.039 3.256-3.424 4.644 4.618 9.91-10.655 3.262 3.421-6.242 6.671-2.083 2.226z" fill="currentColor" transform="translate(-.704 -.71)"></path><ellipse cx="18.606" cy="18.606" fill="none" rx="17.106" ry="17.106" stroke="currentColor" strokeWidth="3"></ellipse></svg>
        </div>
        <div>Dodano do koszyka</div>
        <div className="Product-checkout-modal-content-product">
          <img alt="zdjęcie produktu" src={imgSrc} />
          <div className="Product-checkout-modal-content-product-details">
            <div>{name}</div>
            <div>{price}</div>
          </div>
        </div>
        <div className="Product-checkout-modal-content-actions">
          <button>Do kasy</button>
          <button className="outline">Zobacz koszyk</button>
        </div>
      </div>
    </div>
  )
}

function Product() {
  const { slug } = useParams();
  const { error, loading, data } = useQuery(GET_PRODUCT, { variables: { slug } });
  const [selectedVariant, setSelectedVariant] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    if (!data || !data.product) return;

    if (!data.product.variations) {
      return setSelectedVariant(data.product);
    }

    const defaultVariant = data.product.defaultAttributes?.nodes;

    if (!defaultVariant) {
      return setSelectedVariant(data.product.variations.nodes[0])
    }

    setSelectedVariant(find(data.product.variations.nodes, {
      attributes: {
        nodes: [...defaultVariant]
      }
    }))
  }, [data])


  const changeVariant = (name, value) => {
    const nodes = [...selectedVariant.attributes.nodes];
    remove(nodes, { name })
    nodes.push({ name, value })

    setSelectedVariant(find(data.product.variations.nodes, {
      attributes: {
        nodes
      }
    }));
  }

  const getVariantColor = () => {
    return find(selectedVariant?.attributes?.nodes, { name: 'pa_color' })?.value;
  }

  const getVariantSize = () => {
    return find(selectedVariant?.attributes?.nodes, { name: 'pa_size' })?.value;
  }

  const isAvailable = () => {
    return selectedVariant.stockStatus === 'IN_STOCK';
  }

  const handleSubmit = e => {
    e.preventDefault();
    setShowProductModal(true);
  }

  if (loading) return <Loader />;
  if (error) return <NotFound />;

  return <>
    {showProductModal ?
      <Modal onButtonClose={() => setShowProductModal(false)} name={selectedVariant.name} price={selectedVariant.price} imgSrc={selectedVariant.image?.sourceUrl} />
      : null
    }
    <div className={`Product ${showProductModal ? 'blur' : ''}`}>
      <ImageGallery
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={false}
        thumbnailClass={null}
        items={data.product.galleryImages.nodes.map(e => ({
          original: e.mediaItemUrl,
          thumbnail: e.sourceUrl,
          srcSet: e.srcSet,
        }))} />

      <div className="Product-title">{data.product.name}</div>
      <div className="Product-price">{selectedVariant.price}</div>
      <div className="Product-stock-status">
        Dostępność: {isAvailable() ? <span className="Product-stock-status-ok">Na magazynie</span> : <span>Brak</span>}
      </div>

      <hr />

      <form onSubmit={handleSubmit}>
        {data.product.variations?.nodes.length ?
          <div className="Product-variants">
            <ul>
              <li><span>Kolor</span>
                <ol>
                  {data.product.paColors.nodes.map((val, key) =>
                    <Color onChange={(e) => changeVariant('pa_color', e.target.value)} selected={val.name === getVariantColor()} key={key} color={val.slug} value={val.name} />
                  )}
                </ol>
              </li>
              <li>
                <span>Rozmiar</span>
                <ol>
                  {data.product.paSizes.nodes.map((val, key) =>
                    <Size key={key} value={val.name} selected={val.name === getVariantSize()} onChange={(e) => changeVariant('pa_size', e.target.value)} />
                  )}
                </ol>
              </li>
            </ul>
            <hr />
          </div>
          : null
        }
        <Quantity />
        <button className="Product-add-to-cart" type="submit" disabled={!isAvailable()}>Dodaj do koszyka</button>
      </form>

      <div className="Product-description">
        <h1>Opis</h1>
        <div dangerouslySetInnerHTML={{ __html: data.product.description }}></div>
      </div>
    </div>
  </>;
}

export default Product;