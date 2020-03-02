import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const HighScore = () => {
    const [latestQuiz, setLatestQuiz] = useState('');
    const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);
    const categories = useSelector(state => state.categoriesRed.categories);
    // const [score, setScore] = useState(0);

    const getAllQuizzes = user_quizzes.map(quiz => quiz);
    console.log(getAllQuizzes);
    // console.log(user_quizzes);

    const numberOfQuizzes = getAllQuizzes.length;
    // console.log(numberOfQuizzes);

    const answerssss = user_quizzes.map((quiz, index) => user_quizzes[index].answers.filter(answer => answer.status === true));
    // console.log(answerssss);

    const findCategory = user_quizzes.map((category, index) => categories.filter((id) => id.id == user_quizzes[index].cat_id));
    // const categoryTitle = categories.filter((id, index) => id.id == findCategory.map((id, index) => findCategory[index].id));

    const highscores = user_quizzes.map((quiz, index) => ({ ...quiz, cat: findCategory[index][0], score: answerssss[index].length / user_quizzes[index].answers.length * 100 })).sort((a, b) => {
        if (a.score > b.score) {
            return -1;
        } else if (a.score < b.score) {
            return 1;
        }
        return 0;
    })

    useEffect(() => {
        // get latest quiz 
        const latestQuizz = getAllQuizzes[numberOfQuizzes - 1];
        console.log(latestQuizz)

        const findLatestQuiz = getAllQuizzes.filter((quiz, index) => getAllQuizzes[index].id == latestQuizz.id);
        // console.log(findLatestQuiz);

        setLatestQuiz(findLatestQuiz[0].id);
    }, [])

    return (
        <div className="page">
            <div className="headerbar">
                <h1 className="pageTitle">HIGHSCORE</h1>
            </div>
            <div id="highscoreContainer">{highscores.map((quiz, index) =>
                <div className={classNames({ "last": highscores[index].id === latestQuiz }, "score")} key={index}>
                    <h2>SCORE: {quiz.score.toFixed(0)} %</h2>
                    <h4>Anonymous user - Category: {quiz.cat !== undefined ? quiz.cat.title : ''}</h4>
                </div>
            )}</div>
            <Link to='/'><button>Try again</button></Link>
        </div>
    )
}

export default HighScore;