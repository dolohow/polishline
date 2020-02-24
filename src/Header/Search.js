import React from 'react';
import { Link } from 'react-router-dom';

import { getSearchPostResults } from '../api';
import { debounce } from '../utils'

import './Search.scss';

class Search extends React.Component {
    constructor() {
        super();
        this.state = { data: [], showInstantResults: true };
        this.searchInput = React.createRef();
        this.getData = debounce(this.getData, 500);
    }

    componentDidMount() {
        if (this.props.focus) {
            this.searchInput.current.focus();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = e => {
        const val = e.target.value;
        if (val.length < 3) {
            this.setState({ data: [] });
            return;
        }
        this.getData(val)
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({ showInstantResults: false });
        }, 100);
    }

    handleFocus = () => {
        this.setState({ showInstantResults: true });
    }

    handleClick = () => {
        if (this.props.onLinkClicked) {
            this.props.onLinkClicked();
        }
    }

    getData = async (val) => {
        this.setState({ data: await getSearchPostResults(val) });
    }

    render() {
        return (
            <div className='search-form'>
                <form onSubmit={this.handleSubmit}>
                    <input ref={this.searchInput} type="text" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} placeholder="Szukaj" />
                    {this.state.showInstantResults &&
                        <ul>
                            {this.state.data.map(elem => (
                                <Link onClick={this.handleClick} key={elem.id} to={`/post/${elem.id}/${elem.slug}`}>
                                    <li dangerouslySetInnerHTML={{ __html: elem.title.rendered }}></li>
                                </Link>
                            ))}
                        </ul>
                    }
                </form>
            </div>
        )
    }
}


export default Search;