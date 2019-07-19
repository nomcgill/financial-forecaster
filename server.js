'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const morgan = require('morgan');
// const passport = require('passport');

// const db = client.db('financial-forecaster')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
// const collection = db.collection('userloans')


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {userloans} = require('./models');


// const { router: usersRouter } = require('./users');
// const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const mongo = require('mongodb').MongoClient
const url = `${DATABASE_URL}`

const app = express();
app.use(express.static("public"));
app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

//GET list of entire userloans collection
app.get('/user-loans', (req, res) => {
  MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, (err, client) => {    
    if (err) {
      console.error(err)
      return
    }
    const db = client.db('financial-forecaster')
    const collection = db.collection('userloans')
    collection.find().toArray((err, items) => {
      console.log(items)
      res.json(items)
    })
    assert.equal(null, err);
    client.close();
  })
  // res.json(userloans.get());
});

//GET single object by ID
app.get(`/user-loans/:id`, (req, res) => {
  MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, (err, client) => {    
    if (err) {
      console.error(err)
      return
    }
    const db = client.db('financial-forecaster')
    const collection = db.collection('userloans')
    collection.findOne({id: req.params.id}, (err, item) => {
      console.log(item)
      res.json(item)
    })
    assert.equal(null, err);
    client.close();
  })
  // retrieve loan from database by id
  // res.json(userloans.getOne(req.params.id))
})

//POST a new username with any local loans included
app.post('/user-loans', jsonParser, async (req, res, next) => {
  try {
  MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, async function(err, client) {    
    assert.equal(null, err);
    const db = client.db('financial-forecaster')
    const collection = db.collection('userloans')

    var myPromise = () => {
      return new Promise((resolve, reject) => {
        collection
          .find({username: req.body.username})
          .limit(1)
          .toArray(function(err, data) {
            if (data.length > 0){
              reject(err)
              res.json({ message: `Username ${req.body.username} is already taken.` }).status(409).send()
              return false
              }
            else {resolve}
            console.log(err);
            console.log(data);
            err
              ? reject(err)
              : resolve(
                collection.insertOne(userloans.create(req.body.username, req.body.loans)),
                res.json({ message: `${req.body.username} added to database.`}).status(201).send()
              );
          });
      }).catch(e => {
        console.log(e)
        return false
     })            
    }
    // var myPromise2 = () => {
    //   return new Promise((resolve, reject) => {
    //     collection
    //     .insertOne(userloans.create(req.body.username, req.body.loans), (err, data) => {
    //         err
    //           ? reject(err)
    //           : resolve();
    //       });
    //   });
    // }
    await myPromise() 
    // var result2 = await myPromise2()
    // if (result !== false){
      // console.log("OMG IT'S HAPPENING")
      // res.json(result);
    // }
    client.close();
  });
  } catch (e) {
    next(e)
  }
});

// app.post('/user-loans', jsonParser, (req, res) => {
//     MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, (err, client) => {    
//       if (err) {
//         console.error(err)
//         return
//       }
//       const db = client.db('financial-forecaster')
//       const collection = db.collection('userloans')

//       collection.findOne({username: req.body.username}, function(err, user){
//         if(err) {
//           console.log(err);
//         }
//         var message;
//         if(user) {
//           console.log(user)
//             message = "user exists";
//             console.log(message)
//             res.json({message: message}).status(404).send()
//             return
//         } else {
//             message= "New user: adding user to database.";
//             console.log(message)
//         }
//       });
//       console.log("heard? Ready to proceed.");
//       collection.insertOne(userloans.create(req.body.username, req.body.loans, req, res), (err, item) => {
//         console.log(`${req.body.username} successfully added to database!`)
//         res.status(204).json({message: `${req.body.username} successfully added to database!`});
//       })
//       assert.equal(null, err);
//       client.close();
//     })
//   }
// );
      
      // collection.find().toArray((err, items) => {
      //   console.log(items)
      //   function mapping(input){
      //     return input.username
      //   }
      //   const database = items.map(mapping)
      //   console.log(database)
      //   for (let i=0; i <= database.length; i++){
      //     if (database[i] == req.body.username){
      //       return res.status(409).json({ message: `Username ${req.body.username} is already taken.` });
      //     }
      //   }
      //   collection.insertOne(userloans.create(req.body.username, req.body.loans), (err, item) => {
      //     console.log(`${req.body.username} successfully added to database!`)
      //     res.status(204).json({message: `${req.body.username} successfully added to database!`});
      //   })
      // })
      // assert.equal(null, err);
      // client.close();
  // function postIt(){
  //   MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, (err, client) => {    
  //     if (err) {
  //       console.error(err)
  //       return
  //     }
  //     const db = client.db('financial-forecaster')
  //     const collection = db.collection('userloans')
  //     assert.equal(null, err);
  //     client.close();
  //   })
  // }
  // checkExisting()
  // postIt()


  // const requiredFields = ['username', 'loans'];
  // for (let i=0; i<requiredFields.length; i++) {
  //   const field = requiredFields[i];
  //   if (!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // }
  // const item = userloans.create(req.body.username, req.body.loans);
  // res.status(201).json(
  //   collection.insertOne({item}, (err, result) => {
  //   })
  // )

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
