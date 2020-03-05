
const initialState = {
    percentage: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SAVE_PERCENTAGE') {
        return {
            ...state,
            percentage: action.percent
        }
    }
    return state;
}

export default reducer;