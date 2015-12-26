require('./assets/app.css');
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.jsx');

// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();




ReactDOM.render(<App/>, document.getElementById('page-container'));