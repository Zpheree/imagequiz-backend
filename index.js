const express = require("express");
let { store } = require("./data_access/store");
const application = express();
const cors = require("cors");
const port = process.env.PORT || 4002;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

//middlewares
application.use(express.json());

application.use(cors({
    origin: "https://zpheree.github.io",
    credentials: true
}));

application.use((request, response, next) => {
    console.log(`request url: ${request.url}`);
    console.log(`request method: ${request.method}`);
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

passport.use(new LocalStrategy({ usernameField: "email" }, function verify(username, password, cb) {
    store.login(username, password)
        .then(x => {
            if (x.valid) {
                return cb(null, x.user);
            } else {
                return cb(null, false, { message: x.message })
            }
        })
        .catch(e => {
            console.log(e);
            return cb("Something went wrong");
        });
    }));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

application.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new SQLiteStore({ db: 'sessions.db', dir: './sessions' })
}));

application.use(passport.initialize());
application.use(passport.authenticate('session'));
application.use(passport.session());

//methods
application.get("/", (request, response) => {
    store.check()
        .then(x => {
            console.log(x);
            response.status(200).json({ done: true, result: x.rows, message: "Welcome to imagequiz-backend API!" });
        })
        .catch(e => {
            console.log(e);
            response.status(500).json({ done: false, message: "Something went wrong." });
        });
    });


application.post("/register", (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;

    store.addCustomer(name, email, password)
        .then(x => {
            if (x.rows.length > 0) {
                response.status(201).json({ done: true, result: "Customer added successfully!" });
            } else {
                response.status(403).json({ done: false, result: "Customer already exists!" });
            }
        }
        )
        .catch(e => {
            console.log(e);
            response.status(500).json({ done: false, message: "Something went wrong." });
        });
    });

application.post("/login", passport.authenticate("local", {
    successRedirect: '/login/success',
    failureRedirect: '/login/failed'
}));


application.get("/login/success", (request, response) => {
    response.status(200).json({ done: true, result: "Successfully logged in!" });
});


application.get("/login/failed", (request, response) => {
    response.status(401).json({ done: false, result: "Credentials invalid!" });
});

application.post('/logout', function (request, response) {
    request.logout();
    response.json({ done: true, message: "The customer signed out successfully!" });
});

application.get("/flowers", (request, response) => {
    store.getFlowers()
        .then(x => {
            response.status(200).json({ done: true, result: x, message: "Got all flowers" });
        })
        .catch(e => {
            console.log(e);
            response.status(500).json({ done: false, message: "Something went wrong." });
        });
    });

application.get("/quiz/:name", (request, response) => {
    if (!request.isAuthenticated()) {
        response.status(401).json({ done: false, signedIn: false, message: "Please log in first!" });
    } else {
        let name = request.params.name;

        store.getQuiz(name)
            .then(x => {
                if (x) {
                    response.status(200).json(
                        { done: true, signedIn: true, result: x, message: "A quiz with this name was found." });
                } else {
                    response.status(404).json(
                        { done: false, signedIn: true, result: undefined, message: "No quiz with this name found!" });
                }
            })
            .catch(e => {
                console.log(e);
                response.status(500).json({ done: false, signedIn: true, message: "Something went wrong." });
            });
        }
    });

application.post("/score", (request, response) => {
    let quizTaker = request.body.quizTaker;
    let quizName = request.body.quizName;
    let score = request.body.score;

    store.checkScore(quizTaker, quizName)
        .then(x => {
            if (x.done) {
                store.addScore(x.result.rows[0].user_id, x.result.rows[0].quiz_id, score).
                    then(y => {
                        if (y.rows.length > 0) {
                            response.status(201).json({ done: true, message: "Score added successfully!" });
                        }
                    })
            } else {
                console.log(x);
                response.status(404).json({ done: false, result: undefined, message: x.message });
            }
        })
        .catch(e => {
            console.log(e);
            response.status(500).json({ done: false, message: "Something went wrong." });
        });
    });

application.get("/scores/:quiztaker/:quizname", (request, response) => {
    let quizTaker = request.params.quiztaker;
    let quizName = request.params.quizname;

    store.checkCustomer(quizTaker)
        .then(x => {
            if (x.done) {
                store.checkQuiz(quizName).
                    then(y => {
                        if (y.done) {
                            store.getScores(x.result, y.result)
                                .then(z => {
                                    if (z.rows.length > 0) {
                                        response.status(201).json({ done: true, result: z.rows, message: "All quizes found of this name for user!" });
                                    } else {
                                        response.status(404).json(
                                            { done: false, result: undefined, message: "No quizes of this name found for the user" });
                                    }
                                })
                                .catch(e => {
                                    console.log(e);
                                    response.status(500).json({ done: false, message: "Something went wrong." });
                                });
                        } else {
                            response.status(404).json({ done: false, result: [], message: y.message })
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        response.status(500).json({ done: false, message: "Something went wrong." });
                    });
            } else {
                response.status(404).json({ done: false, result: [], message: x.message })
            }
        })
        .catch(e => {
            console.log(e);
            response.status(500).json({ done: false, message: "Something went wrong." });
        });
    });

application.listen(port, () => {
    console.log("Listening to port 4002");
    });