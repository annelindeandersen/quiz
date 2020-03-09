import React from 'react';

/**
 * This component renders a pop up that checks whether currentAnswer is set to false and thereby will pop up.
 */
const TooLatePopUp = ({ classNames, currentAnswer }) => {
    return (
        <h2 id="tooLate" className={classNames({ 'tooLate': currentAnswer === false })}>{currentAnswer === false ? 'Too late!!' : ''}</h2>
    )
}

export default TooLatePopUp;