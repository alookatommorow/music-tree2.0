var React = require('react');


var ResultsContainer = React.createClass ({

  render: function () {
    if (this.props.results == null) {
      var searchResult = "Enter search terms"
    } else {
      var searchResult = this.props.results.map(function(result){
      if (this.props.selection == "artist") {
        if (result.type == "artist") {
          return <li key={result.id}> {result.title} </li>;
        }
      }
    });
    };
    return (
        <div>
          {searchResult}
        </div>
    )
  },
});

module.exports = ResultsContainer;