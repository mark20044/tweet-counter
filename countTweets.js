module.exports = function (user, start, end, callback) {
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var max_id = null;
  getTweets([], start, user, max_id, t => {
    
    start = new Date(start);
    end = new Date(end);
    var N = 86400000;

    // convert to noon Eastern 
    start = new Date(start.setUTCHours(16));
    end = new Date() < new Date(end.setUTCHours(16)) ? new Date() : new Date(end.setUTCHours(16));
    
    var totaldays = Math.round(10 * (end - start) / N) / 10;
    
    t = t.length < 1 ? [] : t.filter( x => {
      var d = typeof x != "undefined" && x.hasOwnProperty("created_at") ? new Date(x.created_at) : new Date();
      return ( d <= end && d >= start );
    });
    
    var average = Math.round(10 * t.length / totaldays) / 10;  
    
    // console.log("Returning tweets: " + JSON.stringify(t));
    console.log(user + " has " + t.length + " tweets from " + start + " to " + end);
    
    callback({
      user: user,
      tweets: t.length,
      startdate: start.toLocaleDateString(),
      enddate: end.toLocaleDateString(),
      totaldays: totaldays,
      average: average
    });
  });

  function getTweets(t, s, u, m, cb) {
   var options = {
      screen_name: u, 
      count: 200, 
      result_type: "recent", 
      trim_user: 1,
      include_rts: 1
    };
    if (m != null) options.max_id = m;
    
    client.get('statuses/user_timeline', options, (err,twt,res) => {
      if (err) console.error(err); 
      t = t.concat(twt);
      
      var oldest = t[t.length - 1];
      console.log("Oldest tweet is from: " + oldest.created_at);
      
      if (new Date(oldest.created_at) > new Date(s)) {
        console.log("getting more...");
        getTweets(t, s, u, oldest.id, cb) ;
        
      } else {
        console.log("Got tweets, executing callback");
        cb(t);
      }
    });
  }
}