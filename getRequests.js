module.exports = function (callback) {
  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  
  var url = process.env.MONGODB_URL;    

    MongoClient.connect(url, function (e, db) {
      if (e) {
        console.error('Unable to connect to the mongoDB server. Error:' + e);
        callback( "error: " + e );
      } else {
  
        var collection = db.collection('request_log'); 

        var now = new Date();
        // 15 minutes ago: now minus 15 minutes times 60000 ms per minute
        var window = now - 15 * 60000;

        collection.find().toArray((err, docs) => {
          if (err) console.error(err);
          
          docs = docs.filter( x => new Date(x.time) <= now && new Date(x.time) >= window);
          // console.log(docs);
          console.log("Requests in the last 15 minutes: " + docs.length);

          callback( docs.length );

        });

        db.close();
      
      }
    });
}