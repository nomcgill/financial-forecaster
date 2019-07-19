router.post('/api/get_data', async (req, res, next) => {
  try {
  MongoClient.connect(connectionStr, mongoOptions, function(err, client) {
     assert.equal(null, err);
     const db = client.db('db');
        
     //Step 1: declare promise
        
      var myPromise = () => {
         return new Promise((resolve, reject) => {
          
            db
            .collection('your_collection')
            .find({id: 123})
            .limit(1)
            .toArray(function(err, data) {
               err 
                  ? reject(err) 
                  : resolve(data[0]);
             });
         });
      };
     //await myPromise
     var result = await myPromise();
     //continue execution
     client.close();
     res.json(result);
  }); //end mongo client
  } catch (e) {
     next(e)
  }
  });
