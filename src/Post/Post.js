import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Comments } from 'react-facebook';

import DateComponent from '../DateComponent';

import ImageGallery from 'react-image-gallery';

import { getThumbnailUrlFromFullUrl } from '../utils';
import { getPost } from '../api';

import './Post.scss';


class Post extends React.Component {
    constructor() {
        super();
        this.state = { data: null };
    }

    async componentDidMount() {
        this.setState({ data: await getPost(this.props.match.params.id) });
    }

    async componentDidUpdate(prevProps) {
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

        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ data: await getPost(this.props.match.params.id) });
        }
    }

    render() {
        if (!this.state.data)
            return <div></div>

        const styles = {
            background: `url(${this.state.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}) center center / cover no-repeat`,
        };

        return (
            <div className="Post">
                <div className="Post-image" style={styles}>
                    <div className="Post-image-opacity"></div>
                    <div className="Post-image-content">
                        <h1 dangerouslySetInnerHTML={{ __html: this.state.data.title.rendered }}></h1>
                        <hr />
                        <DateComponent date={this.state.data.date} />
                        <div className="Post-image-tags">
                            <ul>
                                {this.state.data._embedded['wp:term'][1].map((d, key) =>
                                    <li key={key}>
                                        <Link to={{
                                            pathname: "/",
                                            search: `tags=${d.id}`,
                                            state: {
                                                tag: d.name
                                            }
                                        }}>{d.name}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Post-content">
                    <p className="excerpt" dangerouslySetInnerHTML={{ __html: this.state.data.excerpt.rendered }}></p>
                    <div className="content" dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered }}></div>
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
                <Comments href={`https://${window.location.hostname}/${this.props.match.params.id}`} />
            </div>
        )
    }
}

export default Post;