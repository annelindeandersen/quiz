import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
let countDown;

const QuizPage = () => {
    const questions = useSelector(state => state.questionsRed.questions);
    const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentQ, setCurrentQ] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [transition, setTransition] = useState(true);
    let timeNow = Math.floor(Date.now() / 10);
    // console.log(timeNow);
    const [startTime, setStartTime] = useState('');

    useEffect(() => {
        let timeStart = Math.floor(Date.now() / 10);
        setStartTime(timeStart);
    }, [currentQ]);

    // console.log({ START: startTime, END: timeNow, DIFF: timeNow - startTime });

    // get current quiz
    const currentQuiz = user_quizzes[user_quizzes.length - 1];
    // get prev answers
    const prevAnswers = user_quizzes.map(quiz => quiz.answers);
    // get to prev questions array
    const prevQuestionsMap = prevAnswers.map(answerArray => {
        return answerArray.map(q_id => Number(q_id.question));
    });
    // get latest quiz id
    const currentCategoryId = currentQuiz !== undefined ? currentQuiz.cat_id : '';
    // get questions with category id and that have not already been answered!
    const currentQuestion = questions.filter(catId => catId.cat_id === Number(currentCategoryId) && prevQuestionsMap[prevQuestionsMap.length - 1].indexOf(catId.q_id) === -1);

    // if (currentAnswer === null && isClicked === false) {
    const answerTooLate = useCallback(() => {
        // console.log('answerTooLate', { currentAnswer, percentage, isClicked })
        if (currentAnswer === null && percentage === 100 && isClicked === false) {
            if (!currentQ) return;
            // console.log('*************************')
            dispatch({ type: 'SAVE_QUESTION', question: currentQ.q_id, answer: 'Time ran out', status: false });
            setCurrentAnswer(false)
            setIsClicked(true)
        }
    }, [currentAnswer, percentage, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch])

    useEffect(() => {
        // get one random question
        countDown = setTimeout(answerTooLate, 10000);
        // console.log('current Q', currentQ)
        if (currentQ === null) {
            const randomQuestion = currentQuestion[Math.floor(Math.random() * currentQuestion.length)]
            setCurrentQ(randomQuestion);
            setTimeout(() => {
                setTransition(true)
                setPercentage(100);
            }, 1)
        }
    }, [currentQ, percentage])

    const setQuestionStatus = useCallback((answer, index) => {
        let rightNow = Math.floor(Date.now() / 10);
        if (!currentQ) return;
        setPercentage((rightNow - startTime) / 10);
        setTransition(false);
        setIsClicked(true);
        setCurrentAnswer(index);
        dispatch({ type: 'SAVE_QUESTION', question: currentQ.q_id, answer: index, status: index === currentQ.correct_answer });
        clearTimeout(countDown)
    }, [currentQ, dispatch, setPercentage, setIsClicked, setCurrentAnswer, countDown, startTime, setTransition]);

    const nextQuestion = useCallback(() => {
        if (currentQuestion.length === 0) {
            history.push('/highscore');
        }
        // console.log('DO NOT GO HERE BEFORE CLICK')
        setPercentage(0);
        setTransition(false);
        setCurrentAnswer(null);
        setCurrentQ(null);
        setIsClicked(false);
    }, [dispatch, currentQuestion, history, setPercentage, setTransition, setCurrentAnswer, setCurrentQ, setIsClicked])

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