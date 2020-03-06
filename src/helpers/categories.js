
// create new array with questions and categories together
export const getCatWithQs = (categories, questions) => categories.map((category, index) => {
    let questionFilter = questions.filter(question => question.cat_id === category.id)
    return { ...category, ...{ questions: questionFilter } };
});

// get latest quiz's category id
export const getCurrentCategoryId = (currentQuiz) => currentQuiz !== undefined ? currentQuiz.cat_id : '';

// get current category
export const getCurrentCategory = (quizzesByCategory, categories) => quizzesByCategory.map((category, index) => categories.filter((id) => id.id === quizzesByCategory[index].cat_id));