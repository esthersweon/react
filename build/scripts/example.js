var MyReactComponent = React.createClass({displayName: "MyReactComponent",
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
      React.createElement("div", null, 
        React.createElement("h1", null, this.props.title), 
       "Seconds elapsed: ", this.state.seconds, "s"
      )
    );
  }
});

React.render(
  React.createElement(MyReactComponent, {title: "React Example"}),
  document.getElementById('content')
);
