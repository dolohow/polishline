import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Search from './Search';

import './Header.scss';

const GET_MENU_ITEMS = gql`
    query menus {
        menus {
          nodes {
            menuItems {
                nodes {
                    label
                }
            }
          }
        }
      }
`;

function Header() {
    const header = useRef(null)
    const [showMenu, setMenuState] = useState(false);
    const [showMenuFromSearch, setShowMenuFromSearch] = useState(false);
    const { loading, data } = useQuery(GET_MENU_ITEMS);


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

    if (loading) return <></>;

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
                        <img alt="logo" src="/logo.png"></img>
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
                            {data.menus.nodes[0].menuItems.nodes.map((val, key) =>
                                <li key={key}>{val.label}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header;
