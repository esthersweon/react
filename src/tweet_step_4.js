var TwitterContainer = React.createClass({
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
  componentDidMount: function() {
    // Set this.state.data to most recent set of tweets from database
    this.loadTweetsFromServer();

    // Ping database for updated set of tweets every 2000 ms
    setInterval(this.loadTweetsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="tweetBox">
        <h1>Tweets</h1>
        <TweetForm />
        <TweetList data={ this.state.data } />
      </div>
    );
  }
});

var TweetForm = React.createClass({
  render: function () {
    return (
      <form className="tweetForm">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Author Name" ref="author" />
        </div>
        <div className="col-md-7">
          <input type="text" className="form-control" placeholder="Tweet (140 chars max)" ref="text" />
        </div>
        <div className="col-md-2">
          <input type="submit" className="btn btn-info" value="Tweet" />
        </div>
      </form>
    );
  }
});

var TweetList = React.createClass({
  render: function() {
    var tweetsInReverseOrder = this.props.data.reverse();

    return (
      <div className="tweetList">
        {
          tweetsInReverseOrder.map(function(tweet, idx) {
            return (
              // 'key' is a React-specific concept, but not mandatory for this tutorial
              // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
              <Tweet key={ idx } author={ tweet.author } text={ tweet.text } />
            )
          })
        }
      </div>
    );
  }
});

var Tweet = React.createClass({
  render: function () {
    return (
      <div>
        <h2 className="tweetText">{ this.props.text }</h2>
        <span className="tweetAuthor"> - { this.props.author }</span>
      </div>
    )
  }
});

React.render(
  <TwitterContainer url="tweets.json" pollInterval={ 2000 } />,
  document.getElementById('tweets')
);
