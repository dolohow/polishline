import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Header.scss';

class Header extends React.Component {
    constructor() {
        super();
        this.state = { showMenu: false };
    }
    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    render() {
        return (
            <header className="Header">
                <div className="bar">
                    <div className="logo">
                        <img src="/mountains.svg"></img>
                    </div>
                    <CSSTransition timeout={{exit: 200}} classNames="hamburger" in={this.state.showMenu}>
                        <div className="hamburger" onClick={this.toggleMenu} >
                            <img src="/hamburger.svg"></img>
                        </div></CSSTransition>
                    <div className="search">
                        <img src="/magnifier.svg"></img>
                    </div>
                </div>
                <CSSTransition classNames="menu" in={this.state.showMenu} timeout={200} unmountOnExit>
                    <div className="menu">
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