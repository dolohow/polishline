import React from 'react';

import Article from './Article';

import { API_POSTS } from './api';

import './MainPage.scss';

async function fetchPosts(query) {
    const search = query || '?';
    const response = await fetch(`${API_POSTS}${search}&_embed`);
    return await response.json();
};

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = { data: [] }
    }

    async componentDidMount() {
        this.setState({ data: await fetchPosts(this.props.location.search) });
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.setState({ data: await fetchPosts(this.props.location.search) });
        }
    }

    render() {
        const tagName = this.props.location.state?.tag;

        return (
            <div className="MainPage">
                {tagName && <div className="MainPage-filter">{tagName}</div>}
                <div className="MainPage-articles-wrapper">
                    {this.state.data.map(d =>
                        <Article
                            key={d.id}
                            id={d.id}
                            slug={d.slug}
                            date={d.date}
                            title={d.title.rendered}
                            excerpt={d.excerpt.rendered}
                            author='Radzio'
                            img={d._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}
                        />)}
                </div>
            </div>
        )
    }
}

export default MainPage;