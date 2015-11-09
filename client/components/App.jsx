var React = require('react');
var mui = require('material-ui');
var Header = require('./Header.jsx')
var SearchForm = require('./SearchForm.jsx')

var App = React.createClass({
  getDefaultProps: function() {
    // use this for heroku deployment
    // return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};

    // use this when in development
    return {origin: 'http://localhost:3000'};
  },

  render: function () {

    return (

      <div>
        <Header/>
        <SearchForm/>
      </div>



         );

  },

});


module.exports = App;