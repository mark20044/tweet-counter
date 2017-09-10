module.exports = function (user, start, end, callback) {
  var logRequest = require('./logRequest.js')
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  
  // DST check courtesy of https://stackoverflow.com/questions/11887934/how-to-check-if-the-dst-daylight-saving-time-is-in-effect-and-if-it-is-whats
  Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  Date.prototype.dst = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
  }
  
  var today = new Date();
  // 16:00 UTC is Noon EDT, 17:00 UTC is noon EST
  var offset = today.dst() ? 16 : 17;
  // thanks stackoverflow, you're the best
  
  // max_id is the newest tweet to retrieve, first run is null to get the very newest
  var max_id = null;
  getTweets([], start, user, max_id, t => {

    start = new Date(start);
    end = new Date(end);
    // N = ms per day
    var N = 86400000;
    
    // Sometimes people forget what "start" and "end" mean
    if (start > end) {
      var ph = start;
      start = end;
      end = ph;
    }

    // convert to noon Eastern 
    start = new Date(start.setUTCHours(offset));
    // If the specified end date is in the future, use now as the end date
    end = new Date(end.setUTCHours(offset));
    end = today < end ? today : end;
    
    // Compute total number of days, rounded to the nearest tenth
    var totaldays = Math.round(10 * (end - start) / N) / 10;
    
    // if tweets were returned, remove any from the array that fall outside the specified time span
    t = t.length < 1 ? t : t.filter( x => {
      // if the array contains tweet objects, assign d with their created_at date
      var d = x.hasOwnProperty("created_at") ? new Date(x.created_at) : 0;
      return (d <= end && d >= start);
    });
    
    // console.log("Returning tweets: " + JSON.stringify(t));
    
    // replace each tweet with it's id, remove any duplicates
    t = t.map( x => x.id ).filter( (x,i,a) => a.indexOf(x) === i);
    
    // calculate average tweets per day
    var average = Math.round(10 * t.length / totaldays) / 10;

    
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
    // As of Twitter API 1.1, the statuses/user_timeline always includes retweets regardless of the include_rts value
    var options = {
      screen_name: u,
      count: 200,
      result_type: "recent",
      trim_user: 1,
      include_rts: 1
    };
    // Only include max_id property and value on subsequent calls
    if (m != null) options.max_id = m;
    
    // Call Twitter API
    client.get('statuses/user_timeline', options, (err, twt, res) => {
      if (err) console.error(err);
      
      logRequest();
      
      // On first call, t is an empty array
      t = t.concat(twt);
      
      // Find the oldest of the 200 tweets
      var oldest = t[t.length - 1];
      console.log("Oldest tweet is from: " + oldest.created_at);

      // If the oldest tweet is newer than the start date requested (and we got tweets this run), get another 200 tweets...
      if (new Date(oldest.created_at) > new Date(s) && twt.length > 0) {
        console.log("getting more...");
        getTweets(t, s, u, oldest.id, cb);

      } else {
        // ... otherwise, return the tweets we got
        console.log("Got tweets, executing callback");
        cb(t);
      }
    });
  }
}