/* create your Hello React Component here */
var Hello = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>Hello React!</div>
      </div>
    );
  }
});

/* render your Hello React Component here */
React.render(
  <Hello title="React Example" />,
  document.getElementById('hello')
);

/* define styles for your Timer React Component here */
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

/* create your Timer React Component here */
var Timer = React.createClass({
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

/* render your Timer React Component here */
React.render(
  <Timer text="Time Spent on Page:" />,
  document.getElementById('timer')
);
