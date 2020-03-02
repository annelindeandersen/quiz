import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
    const history = useHistory();
    const categories = useSelector(state => state.categoriesRed.categories);
    // const user_quizzes = useSelector(state => state.user_quizzesRed.user_quizzes);
    const questions = useSelector(state => state.questionsRed.questions);
    const dispatch = useDispatch();
    // console.log(categories);

    // console.log(questions)

    // create new array with questions and categories together
    const catWithQs = categories.map((category, index) => {
        let questionFilter = questions.filter(question => question.cat_id == category.id)
        return { ...category, ...{ questions: questionFilter } };
    });
    // console.log(catWithQs);



    return (
        <div className="page">
            <div className="headerbar">
                <h1 className="pageTitle">Quizzy</h1>
            </div>
            <div id='categoryWrapper'>
                {catWithQs.map((category, index) => (
                    // <Link to={`/quiz?id=${category.id}`} key={index}>
                    <div key={index} className='categoryContainer' onClick={() => {
                        dispatch({ type: 'SAVE_CAT', id: category.id })
                        history.push('/quiz')
                    }}>
                        <h2 className="quizTitle">{category.title}</h2>
                        <p className="quizQs">Amount of questions: {category.questions.length}</p>
                        <img className="quizImg" src={`./img/${category.img}`} />
                    </div>
                    // </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage;