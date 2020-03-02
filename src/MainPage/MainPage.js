import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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
                    content(format: RENDERED)
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

function MainPage({ location }) {
    const { loading, data } = useQuery(GET_ALL_POSTS, { variables: { tag: location.state?.tag } });

    if (loading) return <Loader />;
    const tagName = location.state?.tag;

    return (
        <div className="MainPage">
            {tagName && <div className="MainPage-filter">#{tagName}</div>}
            <div className="MainPage-articles-wrapper">
                {data.posts.edges.map(d =>
                    <Article
                        key={d.node.id}
                        id={d.node.databaseId}
                        slug={d.node.slug}
                        date={d.node.date}
                        title={d.node.title}
                        excerpt={d.node.excerpt}
                        author='Radzio'
                        img={d.node.featuredImage.sourceUrl}
                    />)}
            </div>
        </div>
    );
}

export default MainPage;