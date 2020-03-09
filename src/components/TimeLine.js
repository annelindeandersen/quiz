import React from 'react';

const TimeLine = ({ percentage, transition }) => {
    return (
        <div id="timeLine" style={{ width: `${percentage}%`, transition: transition === true ? 'width 10s linear' : 'none' }}></div>
    )
}

export default TimeLine;