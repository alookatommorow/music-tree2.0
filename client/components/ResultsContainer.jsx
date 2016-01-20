var React = require('react');
var List = require('material-ui/lib/lists/list');
var Result = require('./Result.jsx');

var ResultsContainer = React.createClass ({

  render: function () {
    var searchResults = this.props.results.map(function(result, index){
      if (result.type === this.props.queryType) {
        return <Result key={result.uri} result={result} origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} />
      }
    }.bind(this));
    return (
        <div>
          <List>
            {searchResults}
          </List>
        </div>
    );
  },

});

module.exports = ResultsContainer;