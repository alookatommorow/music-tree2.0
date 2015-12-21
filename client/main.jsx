require('./assets/app.css');
// require('./assets/bootstrap.min.css');

var React = require('react');
var ReactDOM = require('react-dom')
var App = require('./components/App.jsx');


ReactDOM.render(<App/>, document.getElementById('page-container'));