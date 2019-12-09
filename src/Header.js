import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { debounce } from './utils'

import './Header.scss';

class Header extends React.Component {
    constructor() {
        super();
        // TODO: Replace showMenuFromSearch with sth sane.
        this.state = { showMenu: false, showMenuFromSearch: false };
        this.searchInput = React.createRef();
    }
    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    toggleMenuFromSearch = () => {
        this.toggleMenu();
        this.setState({ showMenuFromSearch: true })
    }

    handleSearchInputChange = () => {
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
    }

    componentDidUpdate() {
        if (this.state.showMenuFromSearch) {
            this.searchInput.current.focus();
            this.setState({ showMenuFromSearch: false })
        }
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
                        <form onSubmit={this.handleSearchSubmit} className="search-form">
                            <input ref={this.searchInput} type="text" onChange={debounce(this.handleSearchInputChange, 2000)} placeholder="Szukaj" />
                        </form>
                        <ul>
                            <li>Autorzy</li>
                            <li>Galeria</li>
                            <li>Facebook</li>
                        </ul>
                    </div>
                </CSSTransition>
            </header>
        )
    }
};

export default Header;