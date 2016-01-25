var React = require('react');
var List = require('material-ui/lib/lists/list');
var Result = require('./Result.jsx');
var NoResults = require('./NoResults.jsx');

var ResultsContainer = React.createClass ({

  render: function () {
    var searchResults
    var noResults = < NoResults/>
    if (this.props.results.length > 0){
      searchResults = this.props.results.map(function(result, index){
        if (result.type === this.props.queryType) {
          return <Result key={result.uri} result={result} origin={this.props.origin} query={this.props.query} queryType={this.props.queryType} results={this.props.results} resultsKey={index} />
        }
      }.bind(this))
    } else {
      searchResults = noResults
    }
    return (
        <div className='results-container'>
          <List>
            {searchResults}
          </List>
        </div>
    );
  },

});

module.exports = ResultsContainer;