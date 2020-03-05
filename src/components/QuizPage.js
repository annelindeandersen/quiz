import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// helper functions
import { getCurrentQuiz, getPrevAnswers, getPrevQuestions } from '../helpers/quiz';
import { getCurrentCategoryId } from '../helpers/categories';
import { getCurrentQuestion } from '../helpers/questions';

// hooks
import { useAnswerTooLate, useSetQuestionStatus, useNextQuestion } from '../hooks/quiz';

let countDown;
let onLoad;

const QuizPage = () => {
    const percentage = useSelector(state => state.percentageRed.percentage);
    console.log(percentage);
    const questions = useSelector(state => state.questionsRed.questions);
    const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentQ, setCurrentQ] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    // const [percentage, setPercentage] = useState(0);
    const [transition, setTransition] = useState(true);
    let timeNow = Math.floor(Date.now() / 10);
    const [startTime, setStartTime] = useState('');

    // helper variables with functions
    const currentQuiz = getCurrentQuiz(user_quizzes);
    const prevAnswers = getPrevAnswers(user_quizzes);
    const prevQuestions = getPrevQuestions(prevAnswers);
    const currentCategoryId = getCurrentCategoryId(currentQuiz);
    const currentQuestion = getCurrentQuestion(questions, currentCategoryId, prevQuestions);

    // hooks
    const answerTooLate = useAnswerTooLate(currentAnswer, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch, startTime);
    const setQuestionStatus = useSetQuestionStatus(currentQ, dispatch, percentage, setIsClicked, setCurrentAnswer, countDown, startTime, setTransition);
    const nextQuestion = useNextQuestion(dispatch, currentQuestion, history, percentage, setTransition, setCurrentAnswer, setCurrentQ, setIsClicked);

    useEffect(() => {
        clearTimeout(countDown)
        let timeStart = Math.floor(Date.now() / 10);
        setStartTime(timeStart);
        onLoad = setTimeout(() => {
            console.log('ON LOAD')
            setTransition(true)
            if (percentage === 0) {
                dispatch({ type: 'SAVE_PERCENTAGE', percent: 100 });
                // setPercentage(100);
            }
        }, 10)
    }, [currentQ]);

    useEffect(() => {
        // get one random question
        countDown = setTimeout(answerTooLate, 10000);
        if (currentQ === null) {
            const randomQuestion = currentQuestion[Math.floor(Math.random() * currentQuestion.length)]
            setCurrentQ(randomQuestion);
        }
    }, [currentQ])

    useEffect(() => {
        console.log('Change in currentAnswer / isClicked')
        let rightNow = Math.floor(Date.now() / 10);
        clearTimeout(countDown)
        dispatch({ type: 'SAVE_PERCENTAGE', percent: ((rightNow - startTime) / 10) })
    }, [currentAnswer, isClicked])

    console.log({ currentAnswer, percentage, isClicked });

    return (
        <div className="page">
            <div id="timeLine" style={{ width: `${percentage}%`, transition: transition === true ? 'width 10s linear' : 'none' }}></div>
            <div id="quizContainer">
                <h1>{currentQ ? currentQ.question : ''}</h1>
                {currentQ
                    ?
                    <div className="quizAnswers">
                        {currentQ.answers.map((answer, index) => (
                            <div key={index}>
                                {isClicked === false ?
                                    <div className={classNames({ "statusTrue": currentAnswer === index && currentQ.correct_answer === index, "statusFalse": currentAnswer === index && currentQ.correct_answer !== index }, "answer")} key={index} onClick={() => setQuestionStatus(answer, index)}>
                                        <h2>{answer}</h2>
                                    </div>
                                    :
                                    <div className={classNames({ "statusTrue": currentAnswer === index && currentQ.correct_answer === index, "statusTrueFlicker": currentQ.correct_answer === index && currentAnswer !== index, "statusFalse": currentAnswer === index && currentQ.correct_answer !== index }, "answer")} key={index}>
                                        <h2>{answer}</h2>
                                    </div>}
                            </div>
                        ))}
                    </div>
                    :
                    ''
                }
                <h2 id="tooLate" className={classNames({ 'tooLate': currentAnswer === false })}>{currentAnswer === false ? 'Too late!!' : ''}</h2>
                {currentAnswer !== null ?
                    <button onClick={nextQuestion}>{currentQuestion.length === 0 ? 'Finish quiz!' : 'Next Question!'}</button>
                    :
                    ''
                }
            </div>
        </div>
    )
}


export default QuizPage;