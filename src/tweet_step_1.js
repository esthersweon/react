var data = [
  {
      "author": "Michael Scott",
      "text": "Would I rather be feared or loved? Easy, both. I want people to be afraid of how much they love me."
  },
  {
      "author": "Jeff Bezos",
      "text": "In the end, we are our choices."
  }
];

var Twitter = React.createClass({
  // loadTweetsFromServer: function () {
  //   // GET updated set of tweets from database
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     success: function (data) {
  //       // Set state in step 3b of the exercise!
  //     }.bind(this),
  //     error: function (xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  // handleTweetSubmit: function (tweet) {
  //   // POST to add tweet to database
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: tweet,
  //     success: function (data) {
  //       // Set state in step 6 of the exercise!
  //     }.bind(this),
  //     error: function (xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  // componentDidMount: function () {
  //   // Set this.state.data to most recent set of tweets from database
  //   this.loadTweetsFromServer();
  // },
  render: function () {
    return (
      <div className="twitter">
        <h1>Tweets</h1>
        <TweetForm />
        <TweetList />
      </div>
    );
  }
});

var TweetForm = React.createClass({
  render: function () {
    return (
      <form className="tweetForm">
        TweetForm component
      </form>
    );
  }
});

var TweetList = React.createClass({
  render: function () {
    return (
      <div className="tweetList">
        TweetList component
      </div>
    );
  }
});

var Tweet = React.createClass({
  render: function () {
    return (
      <div className="tweet">
        Tweet component
      </div>
    );
  }
});

React.render(
  <Twitter />,
  document.getElementById('tweets')
);
