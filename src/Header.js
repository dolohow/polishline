import React from 'react';
import {Link} from 'react-router-dom';

import './Header.scss';

class Header extends React.Component {
    render() {
        return (
            <header class="Header">
                <div class="logo">
                    <img src="mountains.svg"></img>
                </div>
                <div class="hamburger">
                    <img src="hamburger.svg"></img>
                </div>
                <div className="search">
                    <img src="magnifier.svg"></img>
                </div>
            </header>
        )
    }
};

export default Header;