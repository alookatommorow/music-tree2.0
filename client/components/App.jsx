var React = require('react');
var Header = require('./Header.jsx');
var SearchContainer = require('./search/SearchContainer.jsx');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');

var App = React.createClass({
  getDefaultProps: function() {
    // use this for production
    // return {
    //   origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    // };

    // use this when in development please
    return {
      origin: 'http://localhost:3000',
    };
  },

  render: function () {
    return (
      <Grid>
        <Row>
          <Header/>
        </Row>
        <Row>
          <SearchContainer origin={this.props.origin}/>
        </Row>
      </Grid>
    );
  },
});

module.exports = App;