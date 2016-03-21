require('./assets/app.css');
require('./assets/atomic.css');
require('bootstrap/dist/css/bootstrap.css');
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.jsx');

ReactDOM.render(<App/>, document.getElementById('page-container'));