import React from 'react';

import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                {/* <svg x="0px" y="0px" width="208px" height="40px" viewBox="0 0 208 40"> <path fill-rule="evenodd" clip-rule="evenodd" fill="#161B1B" d="M0,40l17.6-10.8L27.7,35l26.4-15.8l11.7,8.2L61,34l39.9-33.9l35.4,29.5L140,27l8,6l-8-8l-3,2l-6.2-6.2L143,13 */}
                <svg x="0px" y="0px" width="208px" height="40px" viewBox="0 0 208 40"> <path fill-rule="evenodd" clip-rule="evenodd" fill="#484848" d="M0,40l17.6-10.8L27.7,35l26.4-15.8l11.7,8.2L61,34l39.9-33.9l35.4,29.5L140,27l8,6l-8-8l-3,2l-6.2-6.2L143,13
l15.9,13.5L170,22l15.9,10.5l8.1-1.7L208,40H0z"></path> </svg>
                <img src="/radzio.jpg"></img>
                <div className="copyright">
                    Created by Pampuch&trade; in 2019
                </div>
            </footer>
        )
    }
}

export default Footer;