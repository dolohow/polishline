import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Comments } from 'react-facebook';

import DateComponent from './DateComponent';

import { getPostURL } from './api.js';

import './Post.scss';

async function fetchPost(id) {
    const response = await fetch(getPostURL(id));
    return await response.json();
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: [] };
        this.pointer = 0;
        this.gestures = { x: null, y: null };
    }

    componentDidMount() {
        this.setVisible(0);
    }

    setVisible = (imgNum) => {
        const arr = new Array(this.props.data.length).fill(false);
        arr[imgNum] = true;
        this.setState({
            show: arr
        })
    }

    showNext = () => {
        if (this.pointer + 1 === this.props.data.length) {
            this.pointer = 0;
        }
        else ++this.pointer;
        this.setVisible(this.pointer);
    }

    showPrev = () => {
        if (this.pointer === 0) {
            this.pointer = this.props.data.length - 1;
        }
        else --this.pointer;
        this.setVisible(this.pointer);
    }

    handleTouchStart = (e) => {
        this.gestures.x = e.touches[0].clientX;
        this.gestures.y = e.touches[0].clientY
    }

    handleTouchMove = (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const xDiff = this.gestures.x - x;
        const yDiff = this.gestures.y - y;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.showNext();
            } else {
                this.showPrev();
            }
        }
        this.gestures.x = null;
        this.gestures.y = null;
    }

    render() {
        return (
            <div onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
                <ul>
                    {this.props.data.map((d, key) =>
                        this.state.show[key] &&
                        <li key={key}>
                            <img src={d.img} />
                            <figcaption>{d.caption}</figcaption>
                        </li>)}
                </ul>
                <div className="navigation">
                    <img alt="poprzedni obrazek" onClick={this.showPrev} className="arrow prev" src="/arrow.svg" />
                    <span>{this.pointer + 1} / {this.props.data.length}</span>
                    <img alt="następny obrazek" onClick={this.showNext} className="arrow next" src="/arrow.svg" />
                </div>
            </div>
        )
    }
}

class Post extends React.Component {
    constructor() {
        super();
        this.state = { data: null };
    }

    async componentDidMount() {
        this.setState({ data: await fetchPost(this.props.match.params.id) });
    }

    async componentDidUpdate(prevProps) {
        const galleries = document.querySelectorAll('.wp-block-gallery');
        for (let gallery of galleries) {
            const data = [];
            const galleriesFigures = gallery.querySelectorAll('figure');
            galleriesFigures.forEach(g => {
                data.push({
                    img: g.children[0].src,
                    caption: g.children[1].innerText,
                });
            })
            ReactDOM.render(<Gallery data={data} />, gallery);
        }

        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ data: await fetchPost(this.props.match.params.id) });
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
                            <img alt="messenger" src="/messenger.svg" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`whatsapp://send?text=${window.location.href}`}>
                            <img alt="whatsapp" src="/whatsapp.svg" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                            <img alt="facebook" src="/facebook.svg" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`mailto:?&body=${window.location.href}`}>
                            <img alt="email" src="/email.svg" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/home?status=${window.location.href}`}>
                            <img alt="twitter" src="/twitter.svg" />
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