const { flowers } = require('./flowers');

let generateQuestions = () => {
    let questions = [];
    let choiceIndex = 0;
    for(let i = 0; i < flowers.length; i++) {
        choiceIndex = i;
        if(choiceIndex > (flowers.length - 4)){
           choiceIndex = i - 2;
        }
        let question = {
            picture: flowers[i].picture,
            choices: [flowers[choiceIndex].name, flowers[choiceIndex+1].name, flowers[choiceIndex+2].name],
            answer: flowers[i].name
        };
        questions.push(question);
    }
    return questions;
};

let generateQuizzes = () => {
    let quizzes = []; 
    let questionIndex = 0;
    let questions = generateQuestions();
    for(let i = 0; i < questions.length; i++){
        questionIndex = i;
        if(questionIndex > (questions.length - 7)) {
            questionIndex = i - 5;
        }
        let quizQuestions = [
            questions[questionIndex], 
            questions[questionIndex+1], 
            questions[questionIndex+2], 
            questions[questionIndex+3], 
            questions[questionIndex+4],
            questions[questionIndex+5]
        ];
        let quiz = {id: i, name: flowers[i].name, questions: quizQuestions};
        quizzes.push(quiz);
    }
    return quizzes;
};

let quizzes = generateQuizzes();


module.exports = { quizzes }