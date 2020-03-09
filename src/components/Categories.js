import React from 'react';

/**
 * This component renders all categories that on click will start and set a new quiz with category id. 
 */
const Categories = ({ index, category, dispatch, history }) => {
    return (
        <div className='categoryContainer' onClick={() => {
            dispatch({ type: 'SAVE_CAT', id: category.id })
            history.push('/quiz')
        }}>
            <h2 className="quizTitle">{category.title}</h2>
            <p className="quizQs">Amount of questions: {category.questions.length}</p>
            <img className="quizImg" src={require(`../assets/img/${category.img}`)} alt={category.img} />
        </div>
    )
}

export default Categories;