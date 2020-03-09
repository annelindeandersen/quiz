import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';

import HomePage from './views/HomePage';
import QuizPage from './views/QuizPage';
import HighScore from './views/HighScore';

function App() {
  const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);

  return (
    <div className="App">
      <Router>
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames='fade'>
              <Switch location={location}>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/quiz">
                  {user_quizzes.length === 0 ?
                    <Redirect to="/" />
                    :
                    <QuizPage />
                  }
                </Route>
                <Route path="/highscore">
                  {user_quizzes.length === 0 ?
                    <Redirect to="/" />
                    :
                    <HighScore />
                  }
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    </div>
  );
}

export default App;
