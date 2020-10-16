import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Loader from '../Loader';
import Spinner from '../Spinner';

import './Store.scss';

const GET_ALL_PRODUCTS = gql`
  query products($cursor: String) {
    products(first: 6, after: $cursor) {
      edges {
        node {
          slug
          name
          image {
            sourceUrl(size: MEDIUM)
          }
          ...on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function Store() {
  const { data, loading, fetchMore } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <Loader />;
  if (!data.products.pageInfo)
    return <div className="NotFound">Nie ma jeszcze żadnego produktu</div>

  const loadMoreProducts = () => fetchMore({
    variables: { cursor: data.products.pageInfo.endCursor },
  })

  console.log(data.products);
  return (
    <>
      <InfiniteScroll
        className="Store"
        loadMore={loadMoreProducts}
        hasMore={data.products.pageInfo.hasNextPage}
        loader={<Spinner key={0} />}
      >
        {data.products.edges.map((product, key) =>
          <div key={key} className="Store-product">
            <Link to={`product/${product.node.slug}`}>
              <img alt="produkt" src={product.node.image.sourceUrl} />
              <div className="Store-product-name">{product.node.name}</div>
              <div className="Store-product-price">{product.node.price}</div>
            </Link>
          </div>
        )}
      </InfiniteScroll>
    </>
  )

}

export default Store;