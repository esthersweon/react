var Tweet = React.createClass({
  render: function() {
    return (
      <div className="tweet">
        <h2 className="tweetText">
          {this.props.children.toString()}
        </h2>
        <span className="tweetAuthor">
          - {this.props.author}
        </span>
      </div>
    );
  }
});

var TweetBox = React.createClass({
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
      <div className="tweetBox">
        <h1>Tweets</h1>
        <TweetForm onTweetSubmit={this.handleTweetSubmit} />
        <TweetList data={this.state.data} />
      </div>
    );
  }
});

var TweetList = React.createClass({
  render: function() {
    var tweetNodes = this.props.data.reverse().map(function(tweet, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Tweet author={tweet.author} key={index}>
          {tweet.text}
        </Tweet>
      );
    });
    return (
      <div className="tweetList">
        {tweetNodes}
      </div>
    );
  }
});

var TweetForm = React.createClass({
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
      <form className="tweetForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" ref="author" />
        <input type="text" placeholder="140 chars max." ref="text" />
        <input type="submit" value="Tweet" />
      </form>
    );
  }
});

React.render(
  <TweetBox url="tweets.json" pollInterval={2000} />,
  document.getElementById('content')
);
