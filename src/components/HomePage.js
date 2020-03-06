import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCatWithQs } from '../helpers/categories';

const HomePage = () => {
    const history = useHistory();
    const categories = useSelector(state => state.categoriesRed.categories);
    const questions = useSelector(state => state.questionsRed.questions);
    const dispatch = useDispatch();
    const catWithQs = getCatWithQs(categories, questions);

    return (
        <div className="page">
            <div className="headerbar">
                <h1 className="pageTitle">Quizzy</h1>
            </div>
            <div id='categoryWrapper'>
                {catWithQs.map((category, index) => (
                    <div key={index} className='categoryContainer' onClick={() => {
                        dispatch({ type: 'SAVE_CAT', id: category.id })
                        history.push('/quiz')
                    }}>
                        <h2 className="quizTitle">{category.title}</h2>
                        <p className="quizQs">Amount of questions: {category.questions.length}</p>
                        <img className="quizImg" src={require(`../assets/img/${category.img}`)} alt={category.img} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;