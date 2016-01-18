var React = require('react');
var List = require('material-ui/lib/lists/list');
var Result = require('./Result.jsx');



var ResultsContainer = React.createClass ({

  render: function () {
    // var queryType = this.props.queryType;
    var searchResults = this.props.results.map(function(result, index){
      if (result.type === this.props.queryType) {
        console.log("match")
        return <Result key={result.uri} result={result} picSource={result.thumb} origin={this.props.origin} queryType={this.props.queryType} title={result.title} results={this.props.results} resultsKey={index} query={this.props.query}/>
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