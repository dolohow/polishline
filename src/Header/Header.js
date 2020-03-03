import React from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';

import './Header.scss';

class Header extends React.Component {
    constructor() {
        super();
        this.state = { showMenu: false, showMenuFromSearch: false };
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
            <header>
                <div ref={this.header} className="Header">
                    <div className="logo">
                        <Link onClick={this.closeMenu} to="/">
                            <img alt="logo" src="/mountains.svg"></img>
                        </Link>
                    </div>
                    <div className={`hamburger ${this.state.showMenu ? "change" : ""}`} onClick={this.toggleMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    <div onClick={this.toggleMenuFromSearch} className="search">
                        <img alt="szukaj" src="/magnifier.svg"></img>
                    </div>
                    <div className={`menu ${this.state.showMenu ? 'menu-show' : ""}`}>
                        <Search onLinkClicked={this.closeMenu} focus={this.state.showMenuFromSearch} />
                        <div className="links">
                            <ul>
                                <li>Autorzy</li>
                                <li>Galeria</li>
                                <li>Facebook</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
};

export default Header;