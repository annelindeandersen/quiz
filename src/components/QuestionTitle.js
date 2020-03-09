import React from 'react';

/**
 * This components uses the title of the current question that is stored in currentQ
 */
const QuestionTitle = ({ currentQ }) => {
    return (
        <h1>{currentQ ? currentQ.question : ''}</h1>
    )
}

export default QuestionTitle;