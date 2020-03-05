
// get latest quiz's category id
export const getCurrentCategoryId = (currentQuiz) => currentQuiz !== undefined ? currentQuiz.cat_id : '';

// get current category
export const getCurrentCategory = (quizzesByCategory, categories) => quizzesByCategory.map((category, index) => categories.filter((id) => id.id === quizzesByCategory[index].cat_id));