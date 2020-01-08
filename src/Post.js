import React from 'react';
import ReactDOM from 'react-dom';
import { Comments } from 'react-facebook';

import { getPostURL } from './api.js';

import './Post.scss';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: [] };
        this.pointer = 0;
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

    render() {
        return (
            <div>
                <ul>
                    {this.props.data.map((d, key) =>
                        this.state.show[key] &&
                        <li key={key}>
                            <img src={d.img} />
                            <figcaption>{d.caption}</figcaption>
                        </li>)}
                </ul>
                <div className="navigation">
                    <img onClick={this.showPrev} className="arrow prev" src="/arrow.svg" />
                    <span>{this.pointer + 1} / {this.props.data.length}</span>
                    <img onClick={this.showNext} className="arrow next" src="/arrow.svg" />
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
        const response = await fetch(`${getPostURL(this.props.match.params.id)}`);
        const json = await response.json();
        this.setState({ data: json });
    }

    componentDidUpdate() {
        const data = [];
        const gallery = document.querySelector('.wp-block-gallery');
        const galleryFigures = document.querySelectorAll('.wp-block-gallery figure');
        galleryFigures.forEach(g => {
            data.push({
                img: g.children[0].src,
                caption: g.children[1].innerText,
            });
        })
        ReactDOM.render(<Gallery data={data} />, gallery);
    }

    render() {
        if (!this.state.data)
            return <div></div>
        return (
            <div className="Post">
                <img src={this.state.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url} />
                <div className="Post-content">
                    <h1 dangerouslySetInnerHTML={{ __html: this.state.data.title.rendered }}></h1>
                    <p className="excerpt" dangerouslySetInnerHTML={{ __html: this.state.data.excerpt.rendered }}></p>
                    <div className="content" dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered }}></div>
                </div>
                <hr />
                <div className="Post-social-media">
                    <span>Udostępnij</span>
                    <div className="Post-social-media-icons">
                        <a target="_blank" href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}><img src="/facebook.svg" /></a>
                        <a target="_blank" href={`https://twitter.com/home?status=${window.location.href}`}><img src="/twitter.svg" /></a>
                    </div>
                </div>
                <hr />
                <Comments href={`https://${window.location.hostname}/${this.props.match.params.id}`} />
            </div>
        )
    }
}

export default Post;