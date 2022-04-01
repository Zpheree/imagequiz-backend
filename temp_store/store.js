let { customers } = require('./customers');
const bcrypt = require('bcrypt');
let { quizzes } = require('./data');
let { flowers } = require('./flowers');
const { scores } = require('./scores');
  
let store = {
    addCustomer: (name, email, password) => {
        let customer = customers.find(x => x.email.toLowerCase() === email.toLowerCase());
        
        if (customer) {
            return {valid: false}
        } else {
            const hash = bcrypt.hashSync(password, 10);
            customers.push({id: 1, name: name, email: email, password: hash});
            return {valid: true} 
        } 
    },

    login: (email, password) => {
        let customer = customers.find(x => x.email.toLowerCase() === email.toLowerCase());

        if (customer) {
            let valid = bcrypt.compareSync(password, customer.password);
            if (valid) {
                return {valid: true};
            } else {
                return {valid: false, message: 'Credentials are not valid.'}
            }
        } else {
            return {valid: false, message: 'Email not found.'};
        }
    },

    getQuiz: (id) => {
        let quiz = quizzes.find(x => x.name.toLowerCase() === id.toLowerCase());

        if (quiz) {
            return {done: true, quiz};
        } else {
            return {done: false, message: 'No quiz with this name was not found.'};
        }
    },

    getFlowers: () => {
        return {done: true, flowers, message: "Got all flowers"};
      },

    storeQuiz: (quizTaker, quizName, quizScore) => {
        let quiztake = scores.find(x => x.quizTaker === quizTaker);

        if (quiztake) {
            return {valid: false}
        } else {
            scores.push({name: quizTaker, quiz: quizName, score: quizScore});
            return {valid: true} 
        } 
    },
    
    getScore: (quizTaker, quizName) => {

        let score = scores.find(x => x.quizTaker === quizTaker);
        console.log(score)
        if (score) {
            return {done: true, score};
        } else {
            return {done: false, message: 'No quiz with this name was found.'};
        }
    }
};

module.exports = { store };