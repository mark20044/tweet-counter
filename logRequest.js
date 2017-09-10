module.exports = function () {
  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  
  var url = process.env.MONGODB_URL;    
  var time = new Date();
  console.log("Time: " + time);

    MongoClient.connect(url, function (e, db) {
      if (e) {
        console.error('Unable to connect to the mongoDB server. Error:' + e);
        return "error" + e;
      } else {
  
      var collection = db.collection('request_log');  
      collection.insert({time: time}, (err, data) => {
          if (err) console.error(err);
          return data;
      });
      
        db.close();
      
      }
    });
}