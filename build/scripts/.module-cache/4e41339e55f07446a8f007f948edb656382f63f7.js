var Tweet = React.createClass({displayName: "Tweet",
  render: function() {
    return (
      React.createElement("div", {className: "tweet"}, 
        React.createElement("h2", {className: "tweetText"}, 
          this.props.children.toString()
        ), 
        React.createElement("span", {className: "tweetAuthor"}, 
          this.props.author
        )
      )
    );
  }
});

var TweetBox = React.createClass({displayName: "TweetBox",
  loadTweetsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTweetSubmit: function(tweet) {
    var tweets = this.state.data;
    tweets.unshift(tweet);
    this.setState({data: tweets}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // we'll send the ajax request right after we optimistically set the new
      // state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: tweet,
        success: function(data) {
          var last = data[data.length - 1];
          data.pop().unshift(last);
          debugger;
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTweetsFromServer();
    setInterval(this.loadTweetsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement("div", {className: "tweetBox"}, 
        React.createElement("h1", null, "Tweets"), 
        React.createElement(TweetForm, {onTweetSubmit: this.handleTweetSubmit}), 
        React.createElement(TweetList, {data: this.state.data})
      )
    );
  }
});

var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetNodes = this.props.data.map(function(tweet, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        React.createElement(Tweet, {author: tweet.author, key: index}, 
          tweet.text
        )
      );
    });
    return (
      React.createElement("div", {className: "tweetList"}, 
        tweetNodes
      )
    );
  }
});

var TweetForm = React.createClass({displayName: "TweetForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onTweetSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      React.createElement("form", {className: "tweetForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});

React.render(
  React.createElement(TweetBox, {url: "tweets.json", pollInterval: 2000}),
  document.getElementById('content')
);
