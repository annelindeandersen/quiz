import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCatWithQs } from '../helpers/categories';
import Categories from '../components/Categories';

/**
 * This is a view rendering the category components
 */
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
                    <Categories key={index} category={category} index={index} dispatch={dispatch} history={history} />
                ))}
            </div>
        </div>
    )
}

export default HomePage;