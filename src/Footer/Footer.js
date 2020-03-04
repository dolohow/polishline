import React from 'react';

import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="social-icons">
                    <a href="#"><img alt="facebook fanpage" src="/social/facebook2.svg" /></a>
                    <a href="#"><img alt="instagram fanpage" src="/social/instagram2.svg" /></a>
                </div>
            </footer>
        )
    }
}

export default Footer;