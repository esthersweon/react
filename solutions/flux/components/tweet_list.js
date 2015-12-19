var React = require('react');
var Tweet = require('./tweet')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="tweetList">
        {
          this.props.data.map(function(tweet, idx) {
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
