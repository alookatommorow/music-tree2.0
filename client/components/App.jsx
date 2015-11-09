var React = require('react');
var mui = require('material-ui');
var Header = require('./Header.jsx')
var SearchForm = require('./SearchForm.jsx')

var App = React.createClass({

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