import React from 'react';

import './Loader.scss';

class Loader extends React.Component {
    render() {
        if (this.props.loading || this.props.loading === undefined) {
            return (
                <div className="Loader">
                    <div className="Loader-content">
                        <img alt="loading" src="/spinner.svg" />
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
};

export default Loader;
