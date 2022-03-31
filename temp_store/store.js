let { customers } = require('./customers');
const bcrypt = require('bcrypt');
let { quizzes } = require('./data');
 
let store = {
    addCustomer: (name, email, password) => {
        const hash = bcrypt.hashSync(password, 10);
        customers.push({id: 1, name: name, email: email, password: hash});
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
    }
}

module.exports = { store };