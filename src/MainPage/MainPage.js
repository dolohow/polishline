import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Article from './Article';

import Loader from '../Loader';
import Spinner from '../Spinner';
import SEO from '../SEO';

import './MainPage.scss';
import '../NotFound.scss';

const GET_ALL_POSTS = gql`
query posts($tag: String, $cursor: String) {
  posts(where: {tag: $tag}, first: 6, after: $cursor) {
    edges {
      node {
        id
        title
        excerpt(format: RENDERED)
        databaseId
        date
        slug
        featuredImage {
          node {
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  generalSettings {
    title
    description
  }
  seo {
    openGraph {
      frontPage {
        title
        description
        image {
          sourceUrl(size: THUMBNAIL)
        }
      }
    }
  }
}
`;

function MainPage() {
  const { tag } = useParams();
  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, { variables: { tag } });

  if (loading) return <Loader />;
  if (!data.posts.pageInfo)
    return <div className="NotFound">Nie ma jeszcze żadnego wpisu</div>

  const loadMorePosts = () => fetchMore({
    variables: { cursor: data.posts.pageInfo.endCursor },
  })

  return (
    <>
      <SEO
        title={tag ? `${tag} - ${data.generalSettings.title}` : data.generalSettings.title}
        metaDesc={data.generalSettings.description}
        opengraphTitle={data.seo.openGraph.frontPage.title}
        opengraphDescription={data.seo.openGraph.frontPage.description}
      />
      <div className="MainPage">
        {tag && <div className="MainPage-filter">#{tag}</div>}
        <InfiniteScroll
          className="MainPage-articles-wrapper"
          loadMore={loadMorePosts}
          hasMore={data.posts.pageInfo.hasNextPage}
          loader={<Spinner key={0} />}
        >
          {data.posts.edges.map(d =>
            <Article key={d.node.id} data={d.node} />
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default MainPage;
