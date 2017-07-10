var React = require('react');
var createReactClass = require('create-react-class');

var NoResults = createReactClass({
  render: function() {
    return (
      <div className="center-text">
        <img className="no-results-image" src="https://storage.googleapis.com/music-tree/no-results.jpg"></img>
        <div className="no-results">
          No Results For Your Query
        </div>
      </div>
      );
  },

});


module.exports = NoResults;