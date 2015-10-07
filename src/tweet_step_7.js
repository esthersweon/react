var Twitter = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadTweetsFromServer: function () {
    // GET updated set of tweets from database
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTweetSubmit: function (tweet) {
    // Make copy of this.state.data
    // IMPORTANT: never directly manipulate this.state or this.props
    var tweets = this.state.data.slice();

    // Add most recent tweet to beginning of tweets array
    tweets.unshift(tweet);

    // POST to add tweet to database
    this.setState({ data: tweets }, function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: tweet,
        success: function (data) {
          this.setState({
            data: data
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  componentDidMount: function () {
    // Set this.state.data to most recent set of tweets from database
    this.loadTweetsFromServer();
  },
  render: function () {
    return (
      <div className="twitter">
        <h1>Tweets</h1>
        <TweetForm onTweetSubmit={ this.handleTweetSubmit } />
        <TweetList data={ this.state.data } />
      </div>
    );
  }
});

var TweetForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    // Get new author and text from the input fields
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    // Do nothing if either input field is blank
    if (!text || !author) {
      return;
    }

    // Send new author and text up one level to Twitter component
    // so updated tweets can be passed down again into TweetList component
    this.props.onTweetSubmit({ author: author, text: text });

    // Set input fields back to empty
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
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

var TweetList = React.createClass({
  render: function () {
    var tweetsInReverseOrder = this.props.data.reverse();

    return (
      <div className="tweetList">
        {
          tweetsInReverseOrder.map(function(tweet, idx) {
            return (
              // 'key' is a React-specific concept, but not mandatory for this tutorial
              // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
              <Tweet key={ idx } author={ tweet.author } text={ tweet.text } />
            );
          })
        }
      </div>
    );
  }
});

var Tweet = React.createClass({
  render: function () {
    return (
      <div className="tweet">
        <h2 className="tweetText">{ this.props.text }</h2>
        <span className="tweetAuthor"> - { this.props.author }</span>
      </div>
    );
  }
});

React.render(
  <Twitter url="tweets.json" />,
  document.getElementById('tweets')
);
