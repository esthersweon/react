var TwitterContainer = React.createClass({displayName: "TwitterContainer",
  getInitialState: function() {
    return { data: [] };
  },
  loadTweetsFromServer: function() {

    // GET updated set of tweets from database
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ 
          data: data 
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTweetSubmit: function(tweet) {
    // Make copy of this.state.data
    // IMPORTANT: never directly manipulate this.state or this.props
    var tweets = this.state.data.slice();

    // Add most recent tweet to beginning of tweets array
    tweets.unshift(tweet);

    // POST updated set of tweets back to database
    this.setState({ data: tweets }, function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: tweet,
        success: function(data) {
          this.setState({
            data: data
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  componentDidMount: function() {

    // Set this.state.data to most recent set of tweets from database
    this.loadTweetsFromServer();

    // Ping database for updated set of tweets every 2000 ms
    setInterval(this.loadTweetsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement("div", {className: "tweetBox"}, 
        React.createElement("h1", null, "Tweets"), 
        React.createElement(TweetForm, {onTweetSubmit:  this.handleTweetSubmit}), 
        React.createElement(TweetList, {data:  this.state.data})
      )
    );
  }
});

var TweetForm = React.createClass({displayName: "TweetForm",
  handleSubmit: function(e) {
    e.preventDefault();

    // Get new author and text from the input fields
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    // Do nothing if either input field is blank
    if (!text || !author) {
      return;
    }

    // Send new author and text up one level to TwitterContainer component
    // so that the updated tweets can be passed down again into TweetList component
    this.props.onTweetSubmit({author: author, text: text});

    // Set input fields back to empty
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      React.createElement("form", {className: "tweetForm", onSubmit:  this.handleSubmit}, 
        React.createElement("div", {className: "col-md-3"}, 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "Author Name", ref: "author"})
        ), 
        React.createElement("div", {className: "col-md-7"}, 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "Tweet (140 chars max)", ref: "text"})
        ), 
        React.createElement("div", {className: "col-md-2"}, 
          React.createElement("input", {type: "submit", className: "btn btn-info", value: "Tweet"})
        )
      )
    );
  }
});

var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetNodes = this.props.data.reverse().map(function(tweet, idx) {
      return (
        // 'key' is a React-specific concept, but not mandatory for this tutorial
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        React.createElement(Tweet, {key:  idx, author:  tweet.author, text:  tweet.text})
      );
    });
    return (
      React.createElement("div", {className: "tweetList"}, 
         tweetNodes 
      )
    );
  }
});

var Tweet = React.createClass({displayName: "Tweet",
  render: function() {
    return (
      React.createElement("div", {className: "tweet"}, 
        React.createElement("h2", {className: "tweetText"},  this.props.text), 
        React.createElement("span", {className: "tweetAuthor"}, " - ",  this.props.author)
      )
    );
  }
});


React.render(
  React.createElement(TwitterContainer, {url: "tweets.json", pollInterval:  2000 }),
  document.getElementById('tweets')
);
