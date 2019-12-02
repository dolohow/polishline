import React from 'react';

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
                <a href="#">
                    <div className="image" style={styles}></div>
                    <div className="article-content">
                        <div className="author">{this.props.author}</div>
                        <div className="title" dangerouslySetInnerHTML={{__html: this.props.title}}></div>
                        <div className="excerpt" dangerouslySetInnerHTML={{__html: this.props.excerpt}}></div>
                        <hr />
                        <div className="date">{formatDate(this.props.date)}</div>
                    </div>
                </a>
            </article>
        )
    }
}

export default Article;