var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx')


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
            return <li className="collection-item" key={index}> {result.title}  <DetailsContainer queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li> ;
          }
        }
        //if album search
        else if (queryType == "release_title") {
          if (result.type == "master") {
            return <li className="collection-item" key={index}> {result.title} <DetailsContainer queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li>;
          }
        }
        //if song search
        else if (queryType == "track") {
          if (result.type == "master") {
            return <li className="collection-item" key={index}> {result.title} <DetailsContainer queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li>;
          }
        }
      }.bind(this));
    };
    return (
        <div className="collection">
          {searchResult}
        </div>
    );
  },
});

module.exports = ResultsContainer;