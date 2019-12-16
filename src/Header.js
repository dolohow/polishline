import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { getSearchPosts } from './api';
import { debounce } from './utils'

import './Header.scss';


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
        const response = await fetch(getSearchPosts(val));
        const json = await response.json();
        this.setState({ data: json });
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
                <div className="bar">
                    <div className="logo">
                        <Link onClick={this.closeMenu} to="/">
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