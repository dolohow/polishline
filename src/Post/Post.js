import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { Comments } from 'react-facebook';
import ImageGallery from 'react-image-gallery';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


import DateComponent from '../DateComponent';
import Loader from '../Loader';

import { getThumbnailUrlFromFullUrl } from '../utils';

import './Post.scss';

const GET_POST = gql`
    query post($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            title(format: RENDERED)
            excerpt(format: RENDERED)
            content
            date
            tags {
                nodes {
                    name
                }
            }
            featuredImage {
                mediaItemUrl
            }
        }
    }
`;

function Post() {
    const { slug } = useParams();
    const { loading, data } = useQuery(GET_POST, { variables: { slug } });

    useEffect(() => {
        const galleries = document.querySelectorAll('.wp-block-gallery');
        for (let gallery of galleries) {
            const data = [];
            const galleriesFigures = gallery.querySelectorAll('figure');
            galleriesFigures.forEach(g => {
                data.push({
                    original: g.children[0].dataset.fullUrl,
                    description: g.children[1].textContent,
                    srcSet: g.children[0].srcset,
                    thumbnail: getThumbnailUrlFromFullUrl(g.children[0].dataset.fullUrl),
                    thumbnailClass: 'hide-on-mobile',
                });
            })
            ReactDOM.render(<ImageGallery items={data} />, gallery);
        }
    });

    if (loading) return <Loader />;

    const styles = {
        background: `url(${data.post.featuredImage.mediaItemUrl}) center center / cover no-repeat`,
    };

    return (
        <div className="Post">
            <div className="Post-image" style={styles}>
                <div className="Post-image-opacity"></div>
                <div className="Post-image-content">
                    <h1 dangerouslySetInnerHTML={{ __html: data.post.title }}></h1>
                    <hr />
                    <DateComponent date={data.post.date} />
                    <div className="Post-image-tags">
                        <ul>
                            {data.post.tags.nodes.map((d, key) =>
                                <li key={key}>
                                    <Link to={`/tag/${d.name}`}>{d.name}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="Post-content">
                <p className="excerpt" dangerouslySetInnerHTML={{ __html: data.post.excerpt }}></p>
                <div className="content" dangerouslySetInnerHTML={{ __html: data.post.content }}></div>
            </div>
            <hr />
            <div className="Post-social-media">
                <span>Udostępnij</span>
                <div className="Post-social-media-icons">
                    <a target="_blank" rel="noopener noreferrer" href={`fb-messenger://share?link=${window.location.href}`}>
                        <img alt="messenger" src="/social/messenger.svg" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={`whatsapp://send?text=${window.location.href}`}>
                        <img alt="whatsapp" src="/social/whatsapp.svg" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                        <img alt="facebook" src="/social/facebook.svg" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={`mailto:?&body=${window.location.href}`}>
                        <img alt="email" src="/social/email.svg" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/home?status=${window.location.href}`}>
                        <img alt="twitter" src="/social/twitter.svg" />
                    </a>
                </div>
            </div>
            <hr />
            <Comments href={`https://${window.location.hostname}/${slug}`} />
        </div>
    );
}

export default Post;