const express = require('express');
<<<<<<< HEAD
let { store } = require('./data_access/store');
require("dotenv").config();
=======
const { store } = require('./data_access/store');
require('dotenv').config()
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592

const cors = require('cors')
const app = express();
const port = process.env.PORT || 4002;

const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
<<<<<<< HEAD
let origin =  "https://zpheree.github.io";
let backend = "https://zpheree-imagequiz-api.herokuapp.com"

=======

let backend = "'https://zpheree-imagequiz-api.herokuapp.com';";
let origin = "http://zpheree.github.io";

>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
//middlewares
app.use(express.json());

app.use(cors({
<<<<<<< HEAD
  origin: [origin, 'http://localhost:3000'],
  credentials: true
=======
    origin: origin,
    credentials: true
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
}));

app.use((request, response, next) => {
    console.log(`request url: ${request.url}`);
    console.log(`request method: ${request.method}`);
<<<<<<< HEAD
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

passport.use(new LocalStrategy({ usernameField: "email"}, function verify(username, password, cb) {
    store.login(username, password)
    .then(x => {
        if (x.valid) {
            return cb(null, x.user);
        } else {
            return cb(null, false, {message: x.message})
        }
    })
    .catch(e => {
        console.log(e);
        return cb("Something went wrong");
    });
=======
    request.header('Access-Control-Allow-Origin', "https://oliscott21.github.io");
    request.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    request.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    request.header('Access-Control-Allow-Credentials', 'true');
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
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${backend}/auth/google/callback`,
<<<<<<< HEAD
    passReqToCallback   : true
  },
  function (request, accessToken, refreshToken, profile, done) {
    console.log('in Google strategy:');
    //console.log(profile);
    store.findOrCreateNonLocalCustomer(profile.displayName, profile.email, profile.id, profile.provider)
      .then(x => done(null, x))
      .catch(e => {
        console.log(e);
        return done('Something went wrong.');
      });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
=======
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log('in Google strategy:');
        //console.log(profile);
        store.findOrCreateNonLocalCustomer(profile.displayName, profile.email, profile.id, profile.provider)
            .then(x => done(null, x))
            .catch(e => {
                console.log(e);
                return done('Something went wrong.');
            });
    }));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
        cb(null, { id: user.id, username: user.username });
    });
});

<<<<<<< HEAD
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
=======
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
        return cb(null, user);
    });
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new SQLiteStore({ db: 'sessions.db', dir: './sessions' })
}));

app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(passport.session());

//methods
<<<<<<< HEAD
app.get("/", (request, response) => {
    store.check()
    .then ( x => {
        console.log(x);
        response.status(200).json({done: true, result:x.rows, message: "Welcome to imagequiz-backend API!"});
    })
    .catch(e => {
      console.log(e);
      response.status(500).json({done: false, message: "Something went wrong."});
    });
});


=======
// app.get("/", (request, response) => {
//     store.check()
//         .then(x => {
//             console.log(x);
//             response.status(200).json({ done: true, message: "Welcome to imagequiz-backend API!" });
//         })
//         .catch(e => {
//             console.log(e);
//             response.status(500).json({ done: false, message: "Something went wrong." });
//         });
// });
app.get("/", (request, response) => {
    response.status(200).json({done: true, message: "Welcome to imagequiz-backend API!"});
});

>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
app.post("/register", (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;

    store.addCustomer(name, email, password)
<<<<<<< HEAD
    .then(x => {
        if (x.rows.length > 0) {
              response.status(201).json({done: true, result: "Customer added successfully!"});
          } else {
              response.status(403).json({done: false, result: "Customer already exists!"});
          }
      }
    )
    .catch(e => {
      console.log(e);
      response.status(500).json({done: false, message: "Something went wrong."});
    });
=======
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
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
});

app.post("/login", passport.authenticate("local", {
    successRedirect: '/login/success',
    failureRedirect: '/login/failed'
}));

//done
app.get("/login/success", (request, response) => {
<<<<<<< HEAD
    response.status(200).json({done: true, result: "Successfully logged in!"});
=======
    response.status(200).json({ done: true, result: "Successfully logged in!" });
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
});

//done
app.get("/login/failed", (request, response) => {
<<<<<<< HEAD
    response.status(401).json({done: false, result: "Credentials invalid!"});
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  }));

  app.get('/auth/google/success', (request, response) => {
    console.log('/auth/google/success');
    console.log(request.user);
    response.redirect(`${origin}/#/google/${request.user.username}/${request.user.name}`);

  });
  app.get('/auth/google/failure', (request, response) => {
    console.log('/auth/google/failure');
    response.redirect(`${origin}/#/google/failed`);
  });

  app.get('/isloggedin', (request, response) => {
=======
    response.status(401).json({ done: false, result: "Credentials invalid!" });
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

app.get('/auth/google/success', (request, response) => {
    console.log('/auth/google/success');
    console.log(request.user);
    response.redirect(`${origin}/#/google/${request.user.username}/${request.user.name}`);
});

app.get('/auth/google/failure', (request, response) => {
    console.log('/auth/google/failure');
    response.redirect(`${origin}/#/google/failed`);
});

app.get('/isloggedin', (request, response) => {
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
    if(request.isAuthenticated()) {
      response.status(200).json({ done: true, result: true });
    } else {
      response.status(410).json({ done: false, result: false });
    }

    });

<<<<<<< HEAD
app.post('/logout', function(request, response) {
    request.logout();
    response.json({done:true, message: "The customer signed out successfully!"});
=======
app.post('/logout', function (request, response) {
    request.logout();
    response.json({ done: true, message: "The customer signed out successfully!" });
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
});

app.get("/flowers", (request, response) => {
    store.getFlowers()
<<<<<<< HEAD
    .then(x => {
        response.status(200).json({done: true, result: x, message: "Got all flowers"});
    })
    .catch(e => {
        console.log(e);
        response.status(500).json({done: false, message: "Something went wrong."});
    });
=======
        .then(x => {
            response.status(200).json({ done: true, result: x, message: "Got all flowers" });
        })
        .catch(e => {
            console.log(e);
            response.status(500).json({ done: false, message: "Something went wrong." });
        });
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
});

app.get("/quiz/:name", (request, response) => {
    if (!request.isAuthenticated()) {
<<<<<<< HEAD
        response.status(401).json({done: false, signedIn: false, message: "Please log in first!"});
=======
        response.status(401).json({ done: false, signedIn: false, message: "Please log in first!" });
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
    } else {
        let name = request.params.name;

        store.getQuiz(name)
<<<<<<< HEAD
        .then(x => {
            if (x) {
              response.status(200).json(
                {done: true, signedIn: true, result: x, message: "A quiz with this name was found"});
            } else {
              response.status(404).json(
                {done: false, signedIn: true, result: undefined, message: "No quiz with this name found!"});
            }
        })
        .catch(e => {
          console.log(e);
          response.status(500).json({done: false, signedIn: true, message: "Something went wrong."});
        });
=======
            .then(x => {
                if (x) {
                    response.status(200).json(
                        { done: true, signedIn: true, result: x, message: "A quiz with this name was found" });
                } else {
                    response.status(404).json(
                        { done: false, signedIn: true, result: undefined, message: "No quiz with this name found!" });
                }
            })
            .catch(e => {
                console.log(e);
                response.status(500).json({ done: false, signedIn: true, message: "Something went wrong." });
            });
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
    }
});

app.post("/score", (request, response) => {
    let quizTaker = request.body.quizTaker;
    let quizName = request.body.quizName;
    let score = request.body.score;

    store.checkScore(quizTaker, quizName)
<<<<<<< HEAD
    .then(x => {
        if (x.done) {
            store.addScore(x.result.rows[0].user_id, x.result.rows[0].quiz_id, score).
            then(y => {
                if (y.rows.length > 0){
                    response.status(201).json({done: true, message: "Score added successfully!"});
                }
            })
        } else {
            console.log(x);
            response.status(404).json({done: false, result: undefined, message: x.message});
        }
    })
    .catch(e => {
      console.log(e);
      response.status(500).json({done: false, message: "Something went wrong."});
    });
=======
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
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
});

app.get("/scores/:quiztaker/:quizname", (request, response) => {
    let quizTaker = request.params.quiztaker;
    let quizName = request.params.quizname;

    store.checkCustomer(quizTaker)
<<<<<<< HEAD
    .then(x => {
        if (x.done) {
            store.checkQuiz(quizName).
            then(y => {
                if (y.done) {
                  store.getScores(x.result, y.result)
                  .then(z => {
                      if (z.rows.length > 0) {
                        response.status(201).json({done: true, result: z.rows , message: "All quizes found of this name for user!"});
                      } else {
                        response.status(404).json(
                          {done: false, result: undefined, message: "No quizes of this name found for the user"});
                      }
                  })
                  .catch(e => {
                      console.log(e);
                      response.status(500).json({done: false, message: "Something went wrong."});
                  });
                } else {
                    response.status(404).json({done:false, result: [], message: y.message})
                }
            })
            .catch(e => {
                console.log(e);
                response.status(500).json({done: false, message: "Something went wrong."});
            });
        } else {
            response.status(404).json({done:false, result: [], message: x.message})
        }
    })
    .catch(e => {
      console.log(e);
      response.status(500).json({done: false, message: "Something went wrong."});
    });
=======
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
>>>>>>> 2d667b43453497de623fc7839d35c1298ab28592
});

app.listen(port, () => {
    console.log("Listening to port 4002");
});