import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';

import './Header.scss';

function Header() {
    const header = useRef(null)
    const [showMenu, setMenuState] = useState(false);
    const [showMenuFromSearch, setShowMenuFromSearch] = useState(false);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (showMenu) {
                return;
            }

            if (prevScrollPos > currentScrollPos) {
                header.current.classList.remove('Header-hide');
            } else {
                header.current.classList.add('Header-hide');
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const closeMenu = () => {
        setMenuState(false);
        setShowMenuFromSearch(false);
    }

    const toggleMenu = () => {
        setMenuState(!showMenu);
    }

    const toggleMenuFromSearch = () => {
        toggleMenu();
        setShowMenuFromSearch(!showMenuFromSearch);
    }

    return (
        <header>
            <div ref={header} className="Header">
                <div className="logo">
                    <Link onClick={closeMenu} to="/">
                        <img alt="logo" src="/mountains.svg"></img>
                    </Link>
                </div>
                <div className={`hamburger ${showMenu ? "change" : ""}`} onClick={toggleMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div onClick={toggleMenuFromSearch} className="search">
                    <img alt="szukaj" src="/magnifier.svg"></img>
                </div>
                <div className={`menu ${showMenu ? 'menu-show' : ""}`}>
                    <Search onLinkClicked={closeMenu} focus={showMenuFromSearch} />
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


export default Header;