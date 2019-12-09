import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { getSearchPosts } from './api';
import { debounce } from './utils'

import './Header.scss';


class Search extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
        this.searchInput = React.createRef();
        this.getData = debounce(this.getData, 1000);
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
        if (val.length < 2)
            return;
        this.getData(val)
    }

    getData = async (val) => {
        const response = await fetch(getSearchPosts(val));
        const json = await response.json();
        this.setState({ data: json });
    }

    render() {
        return (
            <div className='search-form'>
                <form onSubmit={this.handleSubmit}>
                    <input ref={this.searchInput} type="text" onChange={this.handleChange} placeholder="Szukaj" />
                    <ul>
                        {this.state.data.map(elem => <li key={elem.id} dangerouslySetInnerHTML={{ __html: elem.title.rendered }}></li>)}
                    </ul>
                </form>
            </div>
        )
    }
}

class Header extends React.Component {
    constructor() {
        super();
        this.state = { showMenu: false, showMenuFromSearch: false, searchInputValue: '' };
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    toggleMenuFromSearch = () => {
        this.toggleMenu();
        this.setState({ showMenuFromSearch: true })
    }

    render() {
        return (
            <header className="Header">
                <div className="bar">
                    <div className="logo">
                        <Link to="/">
                            <img src="/mountains.svg"></img>
                        </Link>
                    </div>
                    <CSSTransition timeout={{ exit: 200 }} classNames="hamburger" in={this.state.showMenu}>
                        <div className="hamburger" onClick={this.toggleMenu} >
                            <img src="/hamburger.svg"></img>
                        </div>
                    </CSSTransition>
                    <div onClick={this.toggleMenuFromSearch} className="search">
                        <img src="/magnifier.svg"></img>
                    </div>
                </div>
                <CSSTransition classNames="menu" in={this.state.showMenu} timeout={200} unmountOnExit>
                    <div className="menu">
                        <Search focus={this.state.showMenuFromSearch} />
                        <div className="links">
                            <ul>
                                <li>Autorzy</li>
                                <li>Galeria</li>
                                <li>Facebook</li>
                            </ul>
                        </div>
                    </div>
                </CSSTransition>
            </header>
        )
    }
};

export default Header;