import React from 'react';
import { Comments } from 'react-facebook';

import { getPostURL } from './api.js';

import './Post.scss';


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

    render() {
        if (!this.state.data)
            return <div></div>
        return (
            <div className="Post">
                <img src={this.state.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url} />
                <div className="Post-content">
                    <h1 dangerouslySetInnerHTML={{ __html: this.state.data.title.rendered }}></h1>
                    <div className="content" dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered }}></div>
                </div>
                <hr />
                <div className="Post-social-media">
                    Udostępnij
                </div>
                <hr />
                <Comments href={`https://${window.location.hostname}/${this.props.match.params.id}`} />
            </div>
        )
    }
}

export default Post;