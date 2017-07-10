var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var createReactClass = require('create-react-class');

var SearchIndicator = createReactClass({
  render: function() {
    return (
     <div className='search-bar'>
        <h3>{this.props.text}</h3>
        <ProgressBar active bsStyle="warning" now={100} />
      </div>
    );
  }
});

module.exports = SearchIndicator;