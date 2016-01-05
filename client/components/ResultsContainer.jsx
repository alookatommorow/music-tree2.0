var React = require('react');
var List = require('material-ui/lib/lists/list');
var Result = require('./Result.jsx');



var ResultsContainer = React.createClass ({

  render: function () {
    var queryType = this.props.queryType;
    if (this.props.results !== null) {
      var searchResults = this.props.results.map(function(result, index){
        return <Result key={result.uri} result={result} picSource={result.thumb} origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} query={this.props.query}/>
      }.bind(this));
    };
    return (
        <div>
          <List>
          {this.props.showSearchResults ? searchResults : null }
          </List>
        </div>
    );
  },

});

module.exports = ResultsContainer;