
// get numbers of questions in current category
export const getNumberOfQuestions = (questions, currentCategoryId) => questions.filter((question) => question.cat_id === currentCategoryId);

// Alle true answers
export const getTrueAnswers = (quizzesByCategory) => quizzesByCategory.map((quiz, index) => quizzesByCategory[index].answers.filter(answer => answer.status === true));

// get questions with category id and that have not already been answered!
export const getCurrentQuestion = (questions, currentCategoryId, prevQuestions) => questions.filter(catId => catId.cat_id === Number(currentCategoryId) && prevQuestions[prevQuestions.length - 1].indexOf(catId.q_id) === -1);