import { useCallback } from 'react';
export let answerTooLate;
export let setQuestionStatus;
export let nextQuestion;

export const useFunctions = (currentAnswer, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch, startTime, percentage, setPercentage, setTransition, setCurrentQ, currentQuestion, countDown, history) => {

    // console.log('quiz file', { currentAnswer, percentage, isClicked })

    answerTooLate = useCallback(() => {
        console.log('answerTooLate', { currentAnswer })
        let rightNow = Math.floor(Date.now() / 10);
        if (currentAnswer === null) {
            if (!currentQ) return;
            dispatch({ type: 'SAVE_QUESTION', question: currentQ.q_id, answer: 'Time ran out', status: false, time: rightNow - startTime });
            setCurrentAnswer(false)
            setIsClicked(true)
        }
    }, [currentAnswer, percentage, isClicked, setCurrentAnswer, setIsClicked, currentQ, dispatch, startTime]);

    setQuestionStatus = useCallback((answer, index) => {
        clearTimeout(countDown);
        let rightNow = Math.floor(Date.now() / 10);
        if (!currentQ) return;
        setPercentage((rightNow - startTime) / 10);
        setTransition(false);
        setIsClicked(true);
        setCurrentAnswer(index);
        dispatch({ type: 'SAVE_QUESTION', question: currentQ.q_id, answer: index, status: index === currentQ.correct_answer, time: rightNow - startTime });
    }, [currentQ, dispatch, setPercentage, setIsClicked, setCurrentAnswer, countDown, startTime, setTransition]);

    nextQuestion = useCallback(() => {
        if (currentQuestion.length === 0) {
            history.push('/highscore');
        }
        setPercentage(0);
        setTransition(false);
        setCurrentAnswer(null);
        setCurrentQ(null);
        setIsClicked(false);
    }, [dispatch, currentQuestion, history, setPercentage, setTransition, setCurrentAnswer, setCurrentQ, setIsClicked]);

}