import React from 'react';
import { Link } from "react-router-dom";

import DateComponent from '../DateComponent';

import './Article.scss';

class Article extends React.Component {
    render() {
        const styles = {
            background: `url(${this.props.data.featuredImage.sourceUrl}) center center / cover no-repeat`,
        };
        return (
            <article className="Article">
                <Link to={`/${this.props.data.slug}`}>
                    <div className="image" style={styles}></div>
                    <div className="article-content">
                        <div className="title" dangerouslySetInnerHTML={{ __html: this.props.data.title }}></div>
                        <div className="excerpt" dangerouslySetInnerHTML={{ __html: this.props.data.excerpt }}></div>
                        <hr />
                        <DateComponent date={this.props.data.date} />
                    </div>
                </Link>
            </article>
        )
    }
}

export default Article;