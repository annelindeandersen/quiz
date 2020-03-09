import React from 'react';

const NextButton = ({ nextQuestion, currentQuestion }) => {
    return (
        <button onClick={nextQuestion}>{currentQuestion.length === 0 ? 'Finish quiz!' : 'Next Question!'}</button>
    )
}

export default NextButton;