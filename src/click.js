/* define styles for your ClickCounter React Component here */
var styles = {
  text: {
    fontSize: '32px', 
    fontWeight: '600'
  }, 
  clickCount: {
    color: 'mediumaquamarine',
    fontSize: '24px'
  }
};

/* create your ClickCounter React Component here */
var ClickCounter = React.createClass({
  getInitialState: function () {
    return { clicks: 0 };
  },
  handleBtnClick: function(e) {
    e.preventDefault();
    this.setState({ clicks: this.state.clicks + 1 });
  },
  render: function() {
    return (
      <button className="click-counter btn btn-primary" style={ styles.text } onClick={ this.handleBtnClick }>
        { this.props.text } <span className="badge" style={ styles.clickCount } >{ this.state.clicks }</span>
      </button>
    );
  }
});

/* render your ClickCounter React Component here */
React.render(
  <ClickCounter text="Clicks" />,
  document.getElementById('click-counter')
);
