//dependencies
const express = require('express');
const { store } = require('./data_access/store');
const { flowers } = require('./temp_store/flowers');
const { scores } = require('./temp_store/scores');
const { request } = require('express');
const { response } = require('express');
const cors = require('cors')

const application = express();
const port = process.env.PORT || 4002;

//middlewares
application.use(express.json());
application.use(cors());

//methods
application.get('/', (request, response) => {
    response.status(200).json({done: true, message: 'Welcome to imagequiz backend API!'});
});

application.post('/register', (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;

    store.addCustomer(name, email, password)
    .then(x => response.status(200).json({done: true, message: 'The customer added successfully!'}))
    .catch(e => {
        console.log(e);
        response.status(500).json({done: false, message: 'The customer was not added due to an error.'})
    });
});

application.post('/login', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

     store.login(email, password)
     .then(x =>{
         if (x.valid) {
            response.status(200).json({ done: true, message: 'The customer logged in successfully!' });
         } else {
            response.status(401).json({ done: false, message: x.message });
         }
     })
     .catch(e => {
        console.log(e);
        response.status(500).json({done: false, message: 'Something went wrong.'})
     });
});

application.get('/quiz/:name', (request, response) => {
    let name = request.params.name;
    store.getQuiz(name)
    .then(x => {
        if (x.id) {
            response.status(200).json( {done: true, result: x });
        } else {
            response.status(404).json({ done: false, message: result.message });
        }
    })
    .catch(e => {
        console.log(e);
        response.status(500).json({done: false, message: 'Something went wrong.'})
    })
});

application.get("/flowers", (request, response) => {
    let result = store.getFlowers();
    response.status(200).json(
      {done: true, result: result.flowers, message: result.message});
});

application.post('/score', (request, response) => {
    let quizTaker = request.body.quizTaker;
    let quizName = request.body.quizName;
    let score = request.body.score;

    store.storeQuiz(quizTaker, quizName, score);
    response.status(200).json({done: true, message: "Quiz successfully saved!"});
});

application.get("/scores/:quiztaker/:quizname", (request, response) => {
    let quizTaker = request.params.quiztaker;
    let quizName = request.params.quizname;

    let result = store.getScores(quizTaker, quizName);

    if (result.done) {
      response.status(200).json(
        {done: true, result: result.ret, message: result.message});
    } else {
      response.status(404).json(
        {done: false, result: undefined, message: result.message});
    }
});

application.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
