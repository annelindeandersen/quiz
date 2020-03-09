import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// components
import QuizAnswers from '../components/QuizAnswers';
import TimeLine from '../components/TimeLine';
import NextButton from '../components/NextButton';
import QuestionTitle from '../components/QuestionTitle';
import TooLatePopUp from '../components/TooLatePopUp';

// helper functions
import { getCurrentQuiz, getPrevAnswers, getPrevQuestions } from '../helpers/quiz';
import { getCurrentCategoryId } from '../helpers/categories';
import { getCurrentQuestion } from '../helpers/questions';

// hooks
import { useFunctions, answerTooLate, setQuestionStatus, nextQuestion } from '../hooks/quiz';

let countDown;
let onLoad;

/**
 * This is a view rendering the questions components
 */
const QuizPage = () => {
    // redux
    const questions = useSelector(state => state.questionsRed.questions);
    const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);
    const dispatch = useDispatch();

    const history = useHistory();
    const [currentQ, setCurrentQ] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [transition, setTransition] = useState(true);
    const [startTime, setStartTime] = useState('');

    // helper variables with functions
    const currentQuiz = getCurrentQuiz(user_quizzes);
    const prevAnswers = getPrevAnswers(user_quizzes);
    const prevQuestions = getPrevQuestions(prevAnswers);
    const currentCategoryId = getCurrentCategoryId(currentQuiz);
    const currentQuestion = getCurrentQuestion(questions, currentCategoryId, prevQuestions);

    // hooks
    useFunctions(currentAnswer, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch, startTime, percentage, setPercentage, setTransition, setCurrentQ, currentQuestion, countDown, history);

    // sets new question, starts time & resets timeout.
    useEffect(() => {
        clearTimeout(countDown)
        let timeStart = Math.floor(Date.now() / 10);
        setStartTime(timeStart);

        // get one random question
        countDown = setTimeout(answerTooLate, 10000);
        if (currentQ === null) {
            const randomQuestion = currentQuestion[Math.floor(Math.random() * currentQuestion.length)]
            setCurrentQ(randomQuestion);
        }
    }, [currentQ]);

    // sets timing animation
    useEffect(() => {
        onLoad = setTimeout(() => {
            console.log('ON LOAD')
            setTransition(true)
            if (percentage === 0) {
                setPercentage(100);
            }
        }, 10)
    }, [percentage]);

    // clears timeout if something is clicked
    useEffect(() => {
        console.log('Change in currentAnswer / isClicked')
        clearTimeout(countDown)
    }, [currentAnswer, isClicked])

    return (
        <div className="page">
            <TimeLine percentage={percentage} transition={transition} />
            <div id="quizContainer">
                <QuestionTitle currentQ={currentQ} />
                {currentQ
                    ?
                    <div className="quizAnswers">
                        {currentQ.answers.map((answer, index) => (
                            <QuizAnswers key={index} index={index} isClicked={isClicked} currentAnswer={currentAnswer} currentQ={currentQ} answer={answer} classNames={classNames} setQuestionStatus={setQuestionStatus} />
                        ))}
                    </div>
                    :
                    ''
                }
                <TooLatePopUp classNames={classNames} currentAnswer={currentAnswer} />
                {currentAnswer !== null ?
                    <NextButton nextQuestion={nextQuestion} currentQuestion={currentQuestion} />
                    :
                    ''
                }
            </div>
        </div>
    )
}


export default QuizPage;