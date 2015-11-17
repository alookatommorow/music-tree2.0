var React = require('react');


var ResultsContainer = React.createClass ({

  render: function () {
    if (this.props.results == null) {
        var searchResult = "Enter search terms"
    } else {
      var searchResult = "There are results"
    };
    return (
        <div>
          {searchResult}
        </div>
    )
  },
});

module.exports = ResultsContainer;