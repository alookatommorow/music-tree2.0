var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx')
var DiscogContainer = require('./DiscogContainer.jsx')


var ResultsContainer = React.createClass ({

  render: function () {

    var queryType = this.props.queryType;

    if (this.props.results == null) {
      var searchResult = "Enter search terms"
    } else {
      var searchResult = this.props.results.map(function(result, index){
        //if artist search
        if (queryType == "artist") {
          if (result.type == "artist") {
            return  <li key={result.uri}><img src={result.thumb}></img> {result.title}  <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} details={null} /> <DiscogContainer /></li>;
          }
        }
        //if album search
        else if (queryType == "release_title") {
          if (result.type == "master") {
            return <li key={result.uri}><img src={result.thumb}></img> {result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li>;
          }
        }
        //if song search
        else if (queryType == "track") {
          if (result.type == "master") {
            return <li key={result.uri}> {result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li>;
          }
        }
      }.bind(this));
    };
    return (
        <div>
          {searchResult}
        </div>
    );
  },
});

module.exports = ResultsContainer;