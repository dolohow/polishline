import React from 'react';

function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
}

class DateComponent extends React.Component {
    render () {
        return (
            <div className="date">{formatDate(this.props.date)}</div>
        )
    }
}

export default DateComponent;