# Tweet Counter
## by [Mark Smith](http://www.markworks.net/)

Returns the total number of tweets (including retweets) by a user in a specified span of time. 

See it live at [tweet-counter.com](http://tweet-counter.com/).

Contribute on [GitHub](https://github.com/mark20044/tweet-counter).

### FAQ
#### How do I use Tweet Counter?
  * Tweet Counter is designed to be as user-friendly as possible. Simply type in the Twitter **screen name** of the person whose tweets you want to count, then select the **start date** and **end date** for your count. Hit **Count Tweets** and watch the magic happen! 
#### What happens if I get my start and end dates mixed up?
  * Never fear! Tweet Counter's author did this many times while developing the app, so he implemented a feature that checks the dates and swaps them if they're mixed up.
#### What if I select an end date that's in the future? Won't that mess up my *total days* and *tweets per day* results?
  * Nope! Tweet Counter checks if the end date is in the future, and uses **now** as the end date if it is.
#### How many tweets can Tweet Counter count?
  * Tweet Counter uses the Twitter API 1.1, which can only retrieve about 3200 of a user's most recent tweets.
#### Is there anyway to get a count without retweets?
  * Not at this time. The [Twitter API](https://dev.twitter.com/rest/reference/get/statuses/user_timeline) includes retweets by default. The author may implement a retweet filter in the future if there's demand for it. If you want it, [let him know](http://www.markworks.net/#contact)! 
  * Alternatively, since **Tweet Counter** is open source, you can [contribute](https://github.com/mark20044/tweet-counter) whatever features you'd like!
#### What does "x% App capacity available mean?"
  * Tweet Counter currently uses a single Twitter API Application Authorization, which means it is limited to 1500 requests in a 15 minute window.
#### What is a "request"?
  * A request is a call to the Twitter API, which returns up to 200 tweets at a time. That means a single run of **Count Tweets** can be anywhere from 1 to 17 requests.
#### 17 requests? I thought you said the API can only retrieve 3200 tweets. Are you bad at math?
  * Sometimes! But not in this case. **Tweet Counter** sends one last request to make sure it got all the tweets it can. This is especially useful when counting tweets from a new account: if you select a date before they started tweeting, it stops counting when it gets an empty response.
#### How do I know **Tweet Counter** is accurate?
  * Try it yourself! Find a user with less than 3200 tweets, and use **Tweet Counter** to count them all. Then compare with the number on their actual Twitter dashboard. Feel free to yell at us if it's wrong. (No really, it'd be super helpful if you [told us](http://www.markworks.net/#contact) about any inaccuracies.)
#### I'm too lazy to find a user with less than 3200 tweets. Could you just point me to one?
  * Well if you're that lazy, you'll probably appreciate the length of his screen name, too: [vp](https://twitter.com/vp). Ask **Tweet Counter** to count from any date before 1/20/2017 and tomorrow and you can compare for yourself.
#### What language is **Tweet Counter** written in?
  * **Tweet Counter** is a Node.js app, utilizing Expressjs and Pug, in addition to a number of other dependencies. Get the full list from [NPM](https://www.npmjs.com/package/tweet-counter).
#### What development environment did you use to develop **Tweet Counter**?
  * **Tweet Counter** was developed on Glitch. **Glitch** is the friendly commmunity where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.
  * Find out more [about Glitch](https://glitch.com/about).
