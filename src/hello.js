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