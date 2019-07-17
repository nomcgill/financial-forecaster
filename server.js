'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path')
// const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {userloans} = require('./models');


// const { router: usersRouter } = require('./users');
// const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();
app.use(express.static("public"));

// app.use(express.static(__dirname + "../public"));
app.use(morgan('common'));
// app.use(express.static(__dirname + "/../public"));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

// var htmlPath = path.join(__dirname, 'public', 'index.html');


// app.get('/', function(req, res){
//   res.sendFile(
//     path.join(__dirname, './public', 'index.html'),
//     path.join(__dirname, './public', 'addNewCard.css'),
//     path.join(__dirname, './public', 'profile-handling.js'),
//     path.join(__dirname, './public', 'script.js'),
//     path.join(__dirname, './public', 'addpopup.js'),
//     path.join(__dirname, './public', 'editCard.js')
//   )
// });

// app.get('/stylesheet.css', function(req, res){
//   res.sendFile(
//     path.join(__dirname, './public', 'stylesheet.css')
//   )
// });

//GET list of all user statistics
app.get('/user-loans', (req, res) => {
  res.json(userloans.get());
});

//GET single object by ID
app.get(`/user-loans/:id`, (req, res) => {
  // connect to database
  
  // retrieve loan from database by id
  res.json(userloans.getOne(req.params.id))
})

//POST a new username with any local loans included
app.post('/user-loans', jsonParser, (req, res) => {
  const requiredFields = ['username', 'loans'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = userloans.create(req.body.username, req.body.loans);
  res.status(201).json(item)
});

//UPDATE a user's saved loans.
app.put('/user-loans/:id', jsonParser, (req, res) => {
  if (!(req.params.id === req.body.id)) {
    res.status(400).send({
      error: 'Request path id and request body id values must match'
    })
    return
  }

  userloans.update({
    id: req.params.id,
    username: req.body.username,
    loans: req.body.loans
  });

  res.status(204).end();

});

//PASSPORT, USERNAME, PASSWORD BELOW
// passport.use(localStrategy);
// passport.use(jwtStrategy);

// app.use('/api/users/', usersRouter);
// app.use('/api/auth/', authRouter);

// const jwtAuth = passport.authenticate('jwt', { session: false });

// app.get('/api/protected', jwtAuth, (req, res) => {
//   return res.json({
//     data: 'wifi-burgers-and-fries'
//   });
// });

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, {useNewUrlParser: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}


module.exports = { app, runServer, closeServer };
