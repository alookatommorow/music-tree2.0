var React = require('react');

var NoResults = React.createClass({
  render: function() {
    return (
      <div className="center-text">
        <img className="no-results-image" src="https://storage.googleapis.com/west-coast-skateparks/no-results.jpg"></img>
        <div className="no-results">
          No Results For Your Query
        </div>
      </div>
      );
  },

});


module.exports = NoResults;