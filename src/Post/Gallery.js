import React from 'react';

import './Gallery.scss';


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: [] };
        this.pointer = 0;
        this.gestures = { x: null, y: null };
    }

    componentDidMount() {
        this.setVisible(0);
    }

    setVisible = (imgNum) => {
        const arr = new Array(this.props.data.length).fill(false);
        arr[imgNum] = true;
        this.setState({
            show: arr
        })
    }

    showNext = () => {
        if (this.pointer + 1 === this.props.data.length) {
            this.pointer = 0;
        }
        else ++this.pointer;
        this.setVisible(this.pointer);
    }

    showPrev = () => {
        if (this.pointer === 0) {
            this.pointer = this.props.data.length - 1;
        }
        else --this.pointer;
        this.setVisible(this.pointer);
    }

    handleTouchStart = (e) => {
        this.gestures.x = e.touches[0].clientX;
        this.gestures.y = e.touches[0].clientY
    }

    handleTouchMove = (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const xDiff = this.gestures.x - x;
        const yDiff = this.gestures.y - y;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.showNext();
            } else {
                this.showPrev();
            }
        }
        this.gestures.x = null;
        this.gestures.y = null;
    }

    render() {
        return (
            <div onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
                <ul>
                    {this.props.data.map((d, key) =>
                        this.state.show[key] &&
                        <li key={key}>
                            <img src={d.img} />
                            <figcaption>{d.caption}</figcaption>
                        </li>)}
                </ul>
                <div className="navigation">
                    <img alt="poprzedni obrazek" onClick={this.showPrev} className="arrow prev" src="/arrow.svg" />
                    <span>{this.pointer + 1} / {this.props.data.length}</span>
                    <img alt="następny obrazek" onClick={this.showNext} className="arrow next" src="/arrow.svg" />
                </div>
            </div>
        )
    }
}

export default Gallery;