import React from 'react';

/**
 * This component renders the finished quizzes for each category on the highscore page.
 * It checks if the quiz (highscores) id matches the quizJustFinished to set the latest quiz.
 */
const Quizzes = ({ highscores, quiz, index, classNames, quizJustFinished }) => {
    return (
        <div className={classNames({ "last": highscores[index].id === quizJustFinished }, "score")}>
            <h2>SCORE: {quiz.score.toFixed(0)} % - TIME: {quiz.time / 100} seconds</h2>
            <h4>Anonymous user - Category: {quiz.cat !== undefined ? quiz.cat.title : ''}</h4>
        </div>
    )
}

export default Quizzes;