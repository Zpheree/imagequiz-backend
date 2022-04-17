const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();
let { quizzes } = require('../temp_store/data')
let { flowers } = require('../temp_store/flowers');

const connectionString =
    `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`

console.log(connectionString)
const connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl: { rejectUnauthorized: false }
}

const pool = new Pool(connection);

let store = {
    addCustomer: (name, email, password) => {
        const hash = bcrypt.hashSync(password, 10);
        return pool.query('insert into imagequiz.customer (name, email, password) values ($1, $2, $3)', [name, email, hash]);
        // let customer = customers.find(x => x.email.toLowerCase() === email.toLowerCase());

        // if (customer) {
        //     return { valid: false }
        // } else {
        //     const hash = bcrypt.hashSync(password, 10);
        //     customers.push({ id: 1, name: name, email: email, password: hash });
        //     return { valid: true }
    },

    login: (email, password) => {

        return pool.query('select name, email, password from imagequiz.customer where email = $1', [email])
            .then(x => {
                if (x.rows.length == 1) {
                    let valid = bcrypt.compareSync(password, x.rows[0].password);

                    if (valid) {
                        return { valid: true };
                    } else {
                        return { valid: false, message: 'Credentials are not valid.' }
                    }
                } else {
                    return { valid: false, message: 'Email not found.' }
                }
            });

    },

    getQuiz: (name) => {
        let sql_query = `select q.id as quiz_id, q2.* from imagequiz.quiz q join imagequiz.quiz_question qq on q.id = qq.quiz_id 
        join imagequiz.question q2 on qq.question_id = q2.id
        where lower(q.name) = $1`;

        return pool.query(sql_query, [name.toLowerCase()])
            .then(x => {
                // console.log(x);
                let quiz = {};
                if (x.rows.length > 0) {
                    quiz = {
                        id: x.rows[0].quiz_id,
                        questions: x.rows.map(y => {
                            return { id: y.id, picture: y.picture, choices: y.choices, answer: y.answer }
                        })
                    };
                }
                return quiz;
            });
    },

    getFlowers: () => {
        return pool.query(`select * from imagequiz.flowers`)
        .then(x => {
          let quiz = x.rows.map(y => {
            return {name: y.name, picture: y.picture}
          })
          return quiz;
        });
      },

    storeQuiz: (quizTaker, quizName, quizScore) => {
        scores.push({ quizTaker: quizTaker, quizName: quizName, score: quizScore });
    },

    getScores: (quizTaker, quizName) => {
        let ret = []

        for (i = 0; i < scores.length; i++) {
            if (scores[i].quizTaker === quizTaker & scores[i].quizName === quizName) {
                ret.push(scores[i]);
            }
        }

        if (ret.length > 0) {
            return { done: true, ret, message: "All scores of quiz found for quiz taker!" };
        } else {
            return { done: false, message: "No quiz with this name found!" }
        }
    }
};

module.exports = { store };