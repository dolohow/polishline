import React, { useRef, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
                    url
                }
            }
          }
        }
      }
`;

function Header() {
  const header = useRef(null)
  const [showMenu, setMenuState] = useState(false);
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
  }

  const toggleMenu = () => {
    setMenuState(!showMenu);
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
        <div className="search">
          <img alt="koszyk" src="/shopping-cart.svg"></img>
        </div>
        <div className={`menu ${showMenu ? 'menu-show' : ""}`}>
          <Search onLinkClicked={closeMenu} />
          {data.menus.nodes[0]?.menuItems ?
            <div className="links">
              <ul>
                {data.menus.nodes[0].menuItems.nodes.map((val, key) =>
                  <li key={key}>
                    <Link onClick={closeMenu} to={val.url}>{val.label}</Link>
                  </li>
                )}
              </ul>
            </div>
            : null
          }
        </div>
      </div>
    </header>
  )
}


export default Header;
