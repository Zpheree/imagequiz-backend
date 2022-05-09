const bcrypt = require('bcrypt');
let { customers } = require('./customers');
let { quizzes } = require('./data');
let { scores } = require('./scores')

let store = {

    addCustomer: (name, email, password) => {
        const hash = bcrypt.hashSync(password, 10);
        customers.push({id: 1, name: name, email: email, password: hash});
    },

    login: (email, password) => {
        let customer = customers.find(x => x.email.toLowerCase() === email.toLowerCase());
        if(customer) {
            let valid = bcrypt.compareSync(password, customer.password);
            if(valid) {
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
       if(quiz) {
           return {done: true, quiz};
       } else {
           return {done: false, message: 'No quiz with this name was found.'};
       }
    },

    getScores: () => {
        return scores;
    }

}

module.exports = { store }