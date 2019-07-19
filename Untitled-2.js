app.post('/user-loans', jsonParser, async (req, res, next) => {
  try {
  MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, function(err, client) {    
    assert.equal(null, err);
    const db = client.db('financial-forecaster')
    const collection = db.collection('userloans')

    var myPromise = () => {
      return new Promise((resolve, reject) => {
        collection
          .find({username: req.body.username})
          .limit(1)
          .toArray(function(err, data) {
            err
              ? reject(err)
              : resolve(data);
          });
      });
    }
    var result = await myPromise();
    client.close();
    res.json(result);
  });
  } catch (e) {
    next(e)
  }
});


    if (err) {
      console.error(err)
      return
    }

    collection.findOne({username: req.body.username}, function(err, user){
      if(err) {
        console.log(err);
      }
      var message;
      if(user) {
        console.log(user)
          message = "user exists";
          console.log(message)
          res.json({message: message}).status(404).send()
          return false
      } else {
          message= "New user: adding user to database.";
          console.log(message)
      }
    });
    console.log("heard? Ready to proceed.");
    collection.insertOne(userloans.create(req.body.username, req.body.loans, req, res), (err, item) => {
      console.log(`${req.body.username} successfully added to database!`)
      res.status(204).json({message: `${req.body.username} successfully added to database!`});
    })
    assert.equal(null, err);
    client.close();
  })
}
);