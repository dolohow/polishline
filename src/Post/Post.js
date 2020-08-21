import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { Comments } from 'react-facebook';
import ImageGallery from 'react-image-gallery';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';


import DateComponent from '../DateComponent';
import Loader from '../Loader';
import NotFound from '../NotFound';
import SEO from '../SEO';

import { getThumbnailUrlFromFullUrl } from '../utils';

import './Post.scss';

const GET_POST = gql`
    query post($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            title(format: RENDERED)
            seo {
              opengraphTitle
              metaDesc
              metaKeywords
              opengraphDescription
              opengraphType
              opengraphUrl
              title
              opengraphImage {
                sourceUrl(size: THUMBNAIL)
              }
            }
            excerpt(format: RENDERED)
            content
            date
            commentStatus
            tags {
                nodes {
                    name
                }
            }
            featuredImage {
                sourceUrl(size: MEDIUM_LARGE)
            }
        }
    }
`;

function SocialMediaShare({ url }) {
  const socialButtons = [
    {
      href: `fb-messenger://share?link=${url}`,
      alt: "messenger",
      src: "/social/messenger.svg",
      hideOnDesktop: true
    },
    {
      href: `whatsapp://send?text=${url}`,
      alt: "whatsapp",
      src: "/social/whatsapp.svg",
      hideOnDesktop: true
    },
    {
      href: `https://facebook.com/sharer/sharer.php?u=${url}`,
      alt: "facebook",
      src: "/social/facebook.svg"
    },
    {
      href: `mailto:?&body=${url}`,
      alt: "email",
      src: "/social/email.svg"
    },
    {
      href: `https://twitter.com/home?status=${url}`,
      alt: "twitter",
      src: "/social/twitter.svg"
    },
  ];

  return (
    <div className="Post-social-media-icons">
      {socialButtons.map((val, key) =>
        <a className={val.hideOnDesktop ? "hide-on-desktop" : ""} key={key} target="_blank" rel="noopener noreferrer" href={val.href}>
          <img alt={val.alt} src={val.src} />
        </a>
      )}
    </div>
  );
}

function Post({ location }) {
  const { slug } = useParams();
  const { loading, data } = useQuery(GET_POST, { variables: { slug } });
  const { pathname, hash, search } = location;
  const currentURL = `https://${process.env.REACT_APP_HOSTNAME}${pathname}${hash}${search}`;

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

  if (!data.post) return <NotFound />;

  const styles = {
    background: `url(${data.post.featuredImage.sourceUrl}) center center / cover no-repeat`,
  };

  return (
    <>
      <SEO {...data.post.seo} />
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
          <SocialMediaShare url={currentURL} />
        </div>
        <hr />
        <div className="Post-comments">
          {data.post.commentStatus === "open" ?
            <div>
              <Comments href={`https://${process.env.REACT_APP_HOSTNAME}/${slug}`} />
            </div>
            :
            <div className="Post-comments-disabled">Komentarze zostały wyłaczone</div>
          }
        </div>
      </div>
    </>
  );
}

export default Post;
