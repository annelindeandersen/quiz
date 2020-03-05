import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// helper functions
import { getNumberOfQuestions, getTrueAnswers } from '../helpers/questions';
import { getCurrentCategoryId, getCurrentCategory } from '../helpers/categories';
import { getCurrentQuiz, getNumberOfQuizzes, getHighscores, getQuizzesByCategory, getLatestQuiz, getLatestQuizInCurrentCategory } from '../helpers/quiz';

const HighScore = () => {
    const [quizJustFinished, setQuizJustFinished] = useState('');

    // reducers
    const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);
    const categories = useSelector(state => state.categoriesRed.categories);
    const questions = useSelector(state => state.questionsRed.questions);

    // helper variables with functions
    const currentQuiz = getCurrentQuiz(user_quizzes);
    const currentCategoryId = getCurrentCategoryId(currentQuiz);
    const numberOfQuestions = getNumberOfQuestions(questions, currentCategoryId);
    const quizzesByCategory = getQuizzesByCategory(user_quizzes, currentCategoryId);
    const numberOfQuizzes = getNumberOfQuizzes(quizzesByCategory);
    const trueAnswers = getTrueAnswers(quizzesByCategory);
    const currentCategory = getCurrentCategory(quizzesByCategory, categories);
    const highscores = getHighscores(quizzesByCategory, currentCategory, trueAnswers, numberOfQuestions);
    const latestQuiz = getLatestQuiz(quizzesByCategory, numberOfQuizzes);
    const latestQuizInCurrentCategory = getLatestQuizInCurrentCategory(quizzesByCategory, latestQuiz);

    useEffect(() => {
        setQuizJustFinished(latestQuizInCurrentCategory[0].id);
    }, [])

    return (
        <div className="page">
            <div className="headerbar">
                <h1 className="pageTitle">HIGHSCORE</h1>
                <h1 className="pageTitle">{currentCategory[0][0].title}</h1>
            </div>
            <div id="highscoreContainer">{highscores.map((quiz, index) =>
                <div className={classNames({ "last": highscores[index].id === quizJustFinished }, "score")} key={index}>
                    <h2>SCORE: {quiz.score.toFixed(0)} % - TIME: {quiz.time / 100} seconds</h2>
                    <h4>Anonymous user - Category: {quiz.cat !== undefined ? quiz.cat.title : ''}</h4>
                </div>
            )}</div>
            <Link to='/'><button>Try again</button></Link>
        </div>
    )
}

export default HighScore;