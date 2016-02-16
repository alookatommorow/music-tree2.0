var React = require('react');
var Header = require('./Header.jsx');
var SearchContainer = require('./search/SearchContainer.jsx');
// var ThemeManager = require('material-ui/lib/styles/theme-manager');
var mui = require('material-ui');


var App = React.createClass({
  getDefaultProps: function() {
    // use this for production
    // return {
    //   origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    // };

    // use this when in development
    return {
      origin: 'http://localhost:3000',
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function () {
    return (
      <div>
        <Header/>
        <SearchContainer origin={this.props.origin}/>
      </div>
    );
  },


});


module.exports = App;