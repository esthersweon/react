var TweetDispatcher = require('../dispatcher/tweet_dispatcher');
var TweetConsts = require('../constants/tweet_consts');

var TweetActions = {
  create: function(tweet_data) {
    TweetDispatcher.dispatch({
      actionType: TweetConsts.TWEET_CREATE,
      data: tweet_data
    });
  },
  loadAll: function () {
    TweetDispatcher.dispatch({
      actionType: TweetConsts.TWEET_LOAD_ALL,
    });
  },
}

module.exports = TweetActions;