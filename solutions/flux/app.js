var React = require('react');
var ReactDOM = require('react-dom');
var TwitterFlux = require('./tweet_flux');

ReactDOM.render(
  <TwitterFlux />,
  document.getElementById('tweets')
);