import React from 'react';
import { Route, Switch } from "react-router-dom";

import Article from './Article';
import Post from './Post';

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
            <Switch>
                <Route exact path="/">
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
                </Route>
                <Route path="/post/:id/" component={Post} />
            </Switch>
        )
    }
}

export default MainPage;