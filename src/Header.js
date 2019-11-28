import React from 'react';
import {Link} from 'react-router-dom';

import './Header.scss';

class Header extends React.Component {
    render() {
        return (
            <header>
                <Link to="/"></Link>
                <div className="Header-toggle-menu"></div>
                <div className="Header-styles-search"></div>
            </header>
        )
    }
};

export default Header;