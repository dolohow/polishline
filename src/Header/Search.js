import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { debounce } from '../utils'

import './Search.scss';


const SEARCH_POSTS = gql`
    query posts($query: String!) {
        contentNodes(where: {contentTypes: POST, search: $query}) {
            edges {
                node {
                    ... on Post {
                        id
                        title(format: RENDERED)
                        slug
                    }
                }
            }
        }
    }
`;

function Search({ focus, onLinkClicked }) {
    const [showInstantResults, setShowInstantResults] = useState(false);
    const searchInput = useRef(null);
    const [searchPosts, { loading, data }] = useLazyQuery(SEARCH_POSTS);
    const debouncedSearchPosts = debounce(searchPosts, 500);

    useEffect(() => {
        if (focus) {
            searchInput.current.focus();
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = e => {
        const query = e.target.value;
        if (query.length < 3) {
            setShowInstantResults(false);
            return;
        }
        setShowInstantResults(true);
        debouncedSearchPosts({ variables: { query } });
    }

    const handleFocus = e => {
        setShowInstantResults(true);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setShowInstantResults(false);
        }, 100);
    }

    const handleClick = () => {
        if (onLinkClicked) {
            onLinkClicked();
        }
    }

    return (
        <div className='search-form'>
            <form onSubmit={handleSubmit}>
                <input ref={searchInput} type="text" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="Szukaj" />
                {showInstantResults && !loading && data &&
                    <ul>
                        {data.contentNodes.edges.map(elem => (
                            <Link onClick={handleClick} key={elem.node.id} to={`/${elem.node.slug}`}>
                                <li dangerouslySetInnerHTML={{ __html: elem.node.title }}></li>
                            </Link>
                        ))}
                    </ul>
                }
            </form>
        </div>
    );
}


export default Search;