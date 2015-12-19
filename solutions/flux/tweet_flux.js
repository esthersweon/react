var React = require('react');
var ReactDOM = require('react-dom');
var TweetForm = require('./components/tweet_form');
var TweetList = require('./components/tweet_list');
var TweetStore = require('./stores/tweet_store');
var TweetActions = require('./actions/tweet_actions');

function getTweetState() {
  return {
    data: TweetStore.getAll(),
  };
}

var Twitter = React.createClass({
  getInitialState: function() {
    return getTweetState();
  },
  componentDidMount: function() {
    TweetStore.addChangeListener(this._onChange);
    TweetActions.loadAll();
  },
  render: function () {
    return (
      <div className="twitter">
        <h1>Tweets</h1>
        <TweetForm />
        <TweetList data={ this.state.data } />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTweetState());
  }
});

module.exports = Twitter;

