var styles = {
  text: {
    fontSize: '32px', 
    fontWeight: '600', 
    textDecoration: 'underline'
  }, 
  secondsText: {
    color: 'mediumaquamarine',
    fontSize: '24px'
  }
};

var Hello = React.createClass({
  getInitialState: function () {
    return { seconds: 0 };
  },
  componentDidMount: function () {
    setInterval(function () {
      this.setState({ seconds: this.state.seconds + 1 });
    }.bind(this), 1000);
  },
  render: function() {
    return (
      <div className="timer">
        <div style={ styles.text }>{ this.props.text }</div>
        <div style={ styles.secondsText }>{ this.state.seconds } seconds</div>
      </div>
    );
  }
});

React.render(
  <Hello text="Time Spent on Page:" />,
  document.getElementById('hello')
);
