import React from 'react';

/**
 * This component renders the answers for the current question and sets a true/false class after clicking. 
 * If an answer is clicked (isClicked !== false) the answers will be made unclickable.
 */
const QuizAnswers = ({ index, isClicked, currentAnswer, currentQ, answer, classNames, setQuestionStatus }) => {
    return (
        <div>
            {isClicked === false ?
                <div className={classNames({ "statusTrue": currentAnswer === index && currentQ.correct_answer === index, "statusFalse": currentAnswer === index && currentQ.correct_answer !== index }, "answer")} key={index} onClick={() => setQuestionStatus(answer, index)}>
                    <h2>{answer}</h2>
                </div>
                :
                <div className={classNames({ "statusTrue": currentAnswer === index && currentQ.correct_answer === index, "statusTrueFlicker": currentQ.correct_answer === index && currentAnswer !== index, "statusFalse": currentAnswer === index && currentQ.correct_answer !== index }, "answer")} key={index}>
                    <h2>{answer}</h2>
                </div>}
        </div>
    )
}

export default QuizAnswers;