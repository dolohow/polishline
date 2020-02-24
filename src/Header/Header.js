import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import Search from './Search';

import './Header.scss';

class Header extends React.Component {
    constructor() {
        super();
        this.state = { showMenu: false, showMenuFromSearch: false, searchInputValue: '' };
        this.header = React.createRef();
    }

    closeMenu = () => {
        this.setState({ showMenu: false, showMenuFromSearch: false });
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    toggleMenuFromSearch = () => {
        this.toggleMenu();
        this.setState({ showMenuFromSearch: !this.state.showMenuFromSearch });
    }

    componentDidMount = () => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (this.state.showMenu) {
                return;
            }

            if (prevScrollPos > currentScrollPos) {
                this.header.current.classList.remove('Header-hide');
            } else {
                this.header.current.classList.add('Header-hide');
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <header ref={this.header} className="Header">
                <div className="logo">
                    <Link onClick={this.closeMenu} to="/">
                        <img alt="logo" src="/mountains.svg"></img>
                    </Link>
                </div>
                <CSSTransition timeout={{ exit: 200 }} classNames="hamburger" in={this.state.showMenu}>
                    <div className="hamburger" onClick={this.toggleMenu} >
                        <img alt="menu" src="/hamburger.svg"></img>
                    </div>
                </CSSTransition>
                <div onClick={this.toggleMenuFromSearch} className="search">
                    <img alt="szukaj" src="/magnifier.svg"></img>
                </div>
                <CSSTransition classNames="menu" in={this.state.showMenu} timeout={200} unmountOnExit>
                    <div className="menu">
                        <Search onLinkClicked={this.closeMenu} focus={this.state.showMenuFromSearch} />
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