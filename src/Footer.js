import React from 'react';

import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <img src="/mountains2.svg"></img>
                <img className="background" src="/radzio.jpg"></img>
            </footer>
        )
    }
}

export default Footer;