import React from 'react';

import Article from './Article';

import { API_POSTS } from './api';

import './MainPage.scss';

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = { isLoading: false, data: []}
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch(API_POSTS);
        const json = await response.json();
        this.setState({ isLoading: false, data: json });
    }

    render() {
        if (this.state.isLoading) {
            return <div></div>
        }
        return (
            <div className="MainPage-articles-wrapper">
                {this.state.data.map(d =>
                <Article
                    key={d.id}
                    date={d.date}
                    title={d.title.rendered}
                    excerpt={d.excerpt.rendered}
                    author='Radzio'
                    img={d._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url}
                />)}
            </div>
        )
    }
}

export default MainPage;