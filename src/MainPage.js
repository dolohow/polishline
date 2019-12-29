import React from 'react';

import Article from './Article';

import { API_POSTS } from './api';

import './MainPage.scss';

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = { data: [] }
    }

    async componentDidMount() {
        const response = await fetch(API_POSTS);
        const json = await response.json();
        this.setState({ data: json });
    }

    render() {
        return (
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
        )
    }
}

export default MainPage;