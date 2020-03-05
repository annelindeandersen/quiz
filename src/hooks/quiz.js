import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAnswerTooLate = (currentAnswer, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch, startTime) => {
    const percentage = useSelector(state => state.percentageRed.percentage);
    console.log(' 1 ', percentage);
    dispatch({ type: 'SAVE_PERCENTAGE', percent: percentage });
    return useCallback(() => {
        console.log({ currentAnswer, percentage, isClicked });
        let rightNow = Math.floor(Date.now() / 10);
        if (currentAnswer === null && percentage === 100 && isClicked === false) {
            console.log(' Answer Too Late ');
            if (!currentQ) return;
            dispatch({ type: 'SAVE_QUESTION', question: currentQ.q_id, answer: 'Time ran out', status: false, time: rightNow - startTime });
            setCurrentAnswer(false)
            setIsClicked(true)
        }
    }, [currentAnswer, percentage, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch, startTime])
}

export const useSetQuestionStatus = (currentQ, dispatch, percentage, setIsClicked, setCurrentAnswer, countDown, startTime, setTransition) => {
    console.log(' 2 ');
    return useCallback((answer, index) => {
        if (!currentQ) return;
        console.log(' Set Question ');
        clearTimeout(countDown)
        let rightNow = Math.floor(Date.now() / 10);
        // percentage((rightNow - startTime) / 10);
        dispatch({ type: 'SAVE_PERCENTAGE', percent: ((rightNow - startTime) / 10) })
        setTransition(false);
        setIsClicked(true);
        setCurrentAnswer(index);
        dispatch({ type: 'SAVE_QUESTION', question: currentQ.q_id, answer: index, status: index === currentQ.correct_answer, time: rightNow - startTime });

    }, [currentQ, dispatch, percentage, setIsClicked, setCurrentAnswer, countDown, startTime, setTransition]);
}

export const useNextQuestion = (dispatch, currentQuestion, history, percentage, setTransition, setCurrentAnswer, setCurrentQ, setIsClicked) => {
    console.log(' 3 ');
    return useCallback(() => {
        if (currentQuestion.length === 0) {
            history.push('/highscore');
        }
        console.log(' Next Question ');
        // percentage(0);
        dispatch({ type: 'SAVE_PERCENTAGE', percent: 0 });
        setTransition(false);
        setCurrentAnswer(null);
        setCurrentQ(null);
        setIsClicked(false);
    }, [dispatch, currentQuestion, history, percentage, setTransition, setCurrentAnswer, setCurrentQ, setIsClicked])
}