import { v1 as uuidv1 } from 'uuid';

const initialState = {
    user_quizzes: []
}

const reducer = (state = initialState, action) => {
    // console.log(initialState)
    if (action.type === 'SAVE_CAT') {
        return {
            ...state,
            user_quizzes: [...state.user_quizzes, { id: uuidv1(), cat_id: action.id, answers: [] }]
            // categoryChosen: state.categoryChosen.concat({ id: uuidv1(), cat_id: action.id })
        }
    }
    if (action.type === 'SAVE_QUESTION') {
        const last_quiz = state.user_quizzes.pop();
        last_quiz.answers.push({ question: action.question, answer: action.answer, status: action.status });

        return {
            ...state,
            user_quizzes: [...state.user_quizzes, {
                ...last_quiz,
            }]
            // user_quizzes: state.user_quizzes.concat({ question: action.question, answer: action.answer, status: action.status })
        }
    }
    return state;
}

export default reducer;