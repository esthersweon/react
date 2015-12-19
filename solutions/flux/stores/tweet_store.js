var TweetDispatcher = require('../dispatcher/tweet_dispatcher');
var TweetConsts = require('../constants/tweet_consts');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _tweets = [];

function create (tweet) {
  $.post('tweets.json', tweet, function (data) {
      _tweets.unshift(tweet);
      TweetStore.emitChange(CHANGE_EVENT);
    }.bind(this)
  );
}

function loadAll () {
  // GET updated set of tweets from database
  $.get('tweets.json', function (data) {
      _tweets = data;
      TweetStore.emitChange(CHANGE_EVENT);
    }.bind(this)
  );
}

var TweetStore = assign({}, EventEmitter.prototype, {
  getAll: function () {
    return _tweets;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
});

TweetDispatcher.register(function (action) {
  switch(action.actionType) {
    case TweetConsts.TWEET_CREATE:
      create(action.data);
      break;
    case TweetConsts.TWEET_LOAD_ALL:
      loadAll();
      break;
  }
});

module.exports = TweetStore;
