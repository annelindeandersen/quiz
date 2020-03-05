import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';

// connect redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// reducers
import categories from './store/reducers/categories';
import questions from './store/reducers/questions';
import user_quizzes from './store/reducers/user_quizzes';
import percentage from './store/reducers/percentage';

const rootReducer = combineReducers({
    categoriesRed: categories,
    questionsRed: questions,
    user_quizzesRed: user_quizzes,
    percentageRed: percentage
});

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
