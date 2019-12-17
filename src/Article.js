import React from 'react';
import { Link } from "react-router-dom";

import './Article.scss';

function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
}

class Article extends React.Component {
    render() {
        const styles = {
            background: `url(${this.props.img}) center center / cover no-repeat`,
        };
        return (
            <article className="Article">
                <Link to={`/post/${this.props.id}/${this.props.slug}`}>
                    <div className="image" style={styles}></div>
                    <div className="article-content">
                        <div className="title" dangerouslySetInnerHTML={{ __html: this.props.title }}></div>
                        <div className="excerpt" dangerouslySetInnerHTML={{ __html: this.props.excerpt }}></div>
                        <hr />
                        <div className="date">{formatDate(this.props.date)}</div>
                    </div>
                </Link>
            </article>
        )
    }
}

export default Article;