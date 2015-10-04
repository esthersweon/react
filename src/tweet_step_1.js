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

var TwitterContainer = React.createClass({
  render: function() {
    return (
      <div className="tweetBox">
        <h1>Tweets</h1>
        <TweetForm />
        <TweetList data={ this.props.data } />
      </div>
    );
  }
});

var TweetForm = React.createClass({
  render: function () {
    return (
      <div>
        TweetForm component
      </div>
    )
  }
});

var TweetList = React.createClass({
  render: function () {
    console.log(this.props.data);

    return (
      <div>
        TweetList component
      </div>
    )
  }
});

var Tweet = React.createClass({
  render: function () {
    return (
      <div>
        Tweet component
      </div>
    )
  }
});

React.render(
  <TwitterContainer data={data} />,
  document.getElementById('tweets')
);