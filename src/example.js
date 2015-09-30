var MyReactComponent = React.createClass({
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
      <div>
        <h1>{this.props.title}</h1>
       Seconds elapsed: {this.state.seconds}s
      </div>
    );
  }
});

React.render(
  <MyReactComponent title="React Example" />,
  document.getElementById('content')
);
