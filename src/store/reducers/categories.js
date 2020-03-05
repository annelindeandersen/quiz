import data from '../../data/categories';

const initialState = {
    categories: data
}

const reducer = (state = initialState, action) => {
    // console.log(initialState)
    if (action.type === 'vcx') {
        return {
            ...state,
            categories: state.results.concat({ id: new Date(), value: action.id })
        }
    }
    return state;
}

export default reducer;