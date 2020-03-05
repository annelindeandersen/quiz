
// get current quiz
export const getCurrentQuiz = (user_quizzes) => user_quizzes[user_quizzes.length - 1];

// get prev answers
export const getPrevAnswers = (user_quizzes) => user_quizzes.map(quiz => quiz.answers);

// get to prev questions array
export const getPrevQuestions = (prevAnswers) => prevAnswers.map(answerArray => {
    return answerArray.map(q_id => Number(q_id.question));
});

// All Q's in the latest quiz with same category ID
export const getQuizzesByCategory = (user_quizzes, currentCategoryId) => user_quizzes.filter((quiz, index) => user_quizzes[index].cat_id === currentCategoryId);

// get number of quizzes
export const getNumberOfQuizzes = (quizzesByCategory) => quizzesByCategory.length;

// get latest quiz
export const getLatestQuiz = (quizzesByCategory, numberOfQuizzes) => quizzesByCategory[numberOfQuizzes - 1];

// get latest quiz in current category
export const getLatestQuizInCurrentCategory = (quizzesByCategory, latestQuiz) => quizzesByCategory.filter((quiz, index) => quizzesByCategory[index].id === latestQuiz.id);

// get highscores of current cat's quizzes
export const getHighscores = (quizzesByCategory, currentCategory, trueAnswers, numberOfQuestions) => quizzesByCategory.map((quiz, index) => ({
    ...quiz, cat: currentCategory[index][0], time: quizzesByCategory[index].answers.map((answer, index) => answer.time)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0), score: trueAnswers[index].length / quizzesByCategory[index].answers.length * 100
})).sort((a, b) => {
    if (a.score > b.score) {
        return -1;
    } else if (a.score < b.score) {
        return 1;
    }
    if (a.time > b.time) {
        return 1;
    } else if (a.time < b.time) {
        return -1;
    }
    return 0;
}).filter((result, index) => isNaN(result.score) !== true && result.answers.length === numberOfQuestions.length);