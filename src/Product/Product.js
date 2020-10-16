import React, { useEffect, useState } from 'react';
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

function Product() {
  const { slug } = useParams();
  const { error, loading, data } = useQuery(GET_PRODUCT, { variables: { slug } });
  const [selectedVariant, setSelectedVariant] = useState({});

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
  }

  if (loading) return <Loader />;
  if (error) return <NotFound />;

  return <>
    <div className="Product">
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

      <form>
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
        <button onSubmit={handleSubmit} className="Product-add-to-cart" type="submit" disabled={!isAvailable()}>Dodaj do koszyka</button>
      </form>

      <div className="Product-description">
        <h1>Opis</h1>
        <div dangerouslySetInnerHTML={{ __html: data.product.description }}></div>
      </div>
    </div>
  </>;
}

export default Product;