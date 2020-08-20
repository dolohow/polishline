import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';

import Article from './Article';

import Loader from '../Loader';
import SEO from '../SEO';

import './MainPage.scss';
import '../NotFound.scss';

const GET_ALL_POSTS = gql`
query posts($tag: String, $cursor: String) {
  posts(where: {tag: $tag}, first: 6, after: $cursor) {
    edges {
      node {
        title
        excerpt(format: RENDERED)
        databaseId
        date
        slug
        featuredImage {
          sourceUrl(size: MEDIUM_LARGE)
        }
        id
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
}
`;

function Spinner() {
    return (
        <div style={{ width: "100%", marginTop: "15px" }}>
            <div className="simple-spinner"></div>
        </div>
    );
}

function MainPage() {
    const { tag } = useParams();
    const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, { variables: { tag } });

    if (loading) return <Loader />;
    if (!data.posts.pageInfo)
        return <div className="NotFound">Nie ma jeszcze żadnego wpisu</div>

    const loadMorePosts = () => fetchMore({
        variables: { cursor: data.posts.pageInfo.endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.posts.edges;
            const pageInfo = fetchMoreResult.posts.pageInfo;

            return {
                posts: {
                    __typename: previousResult.posts.__typename,
                    edges: [...previousResult.posts.edges, ...newEdges],
                    pageInfo
                }
            };
        }
    })

    return (
        <>
            <SEO
                pageTitle={tag ? `${tag} | ${data.generalSettings.title}` : data.generalSettings.title}
                title={tag ? `${tag} | ${data.generalSettings.title}` : data.generalSettings.title}
                description={data.generalSettings.description}
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
