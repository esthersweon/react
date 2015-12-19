var React = require('react');
var ReactDOM = require('react-dom');
var TweetActions = require('../actions/tweet_actions');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    // Get new author and text from the input fields
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;

    // Do nothing if either input field is blank
    if (!text || !author) {
      return;
    }

    // Send new author and text up one level to Twitter component
    // so updated tweets can be passed down again into TweetList component
    TweetActions.create({ author: author, text: text });

    // Set input fields back to empty
    ReactDOM.findDOMNode(this.refs.author).value = '';
    ReactDOM.findDOMNode(this.refs.text).value = '';
  },
  render: function () {
    return (
      <form className="tweetForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Author Name" ref="author" />
        <input type="text" placeholder="Tweet" ref="text" />
        <button type="submit" className="btn btn-info">Tweet</button>
      </form>
    );
  }
});