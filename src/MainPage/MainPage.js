import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';

import Article from './Article';

import Loader from '../Loader';

import './MainPage.scss';

const GET_ALL_POSTS = gql`
    query posts($tag: String) {
        posts(where: {tag: $tag}) {
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
        }
    }
`;

function MainPage() {
    const { tag } = useParams();
    const { loading, data } = useQuery(GET_ALL_POSTS, { variables: { tag } });

    if (loading) return <Loader />;

    return (
        <div className="MainPage">
            {tag && <div className="MainPage-filter">#{tag}</div>}
            <div className="MainPage-articles-wrapper">
                {data.posts.edges.map(d =>
                    <Article key={d.node.id} data={d.node} />
                )}
            </div>
        </div>
    );
}

export default MainPage;