var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx');
var DiscogContainer = require('./DiscogContainer.jsx');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Avatar = require('material-ui/lib/avatar');


var ResultsContainer = React.createClass ({

  render: function () {

    var queryType = this.props.queryType;

    if (this.props.results !== null) {

      var searchResults = this.props.results.map(function(result, index){
        //if artist search
        if (queryType == "artist") {
          if (result.type == "artist") {
            return  <List><ListItem key={result.uri} leftAvatar={<Avatar src={result.thumb} size={75} />} > {result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} details={null} /> <DiscogContainer query={this.props.query} resultsKey={index} origin={this.props.origin} results={this.props.results}/></ListItem></List>;
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
          {this.props.showSearchResults ? searchResults : null }
        </div>
    );
  },
});

module.exports = ResultsContainer;