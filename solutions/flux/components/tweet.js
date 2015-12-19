var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="tweet">
        <h2 className="tweetText">{ this.props.text }</h2>
        <span className="tweetAuthor"> - { this.props.author }</span>
      </div>
    );
  }
});