var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx');
var DiscogContainer = require('./DiscogContainer.jsx');
var ListItem = require('material-ui/lib/lists/list-item');
var Avatar = require('material-ui/lib/avatar');

var Result = React.createClass ({

  render: function () {

        //if artist search
        if (this.props.queryType == "artist") {
          if (this.props.result.type == "artist") {
            var resultDisplay = <ListItem leftAvatar={<Avatar src={this.props.picSource} size={75} />} > {this.props.result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={this.props.resultsKey} details={null} /> <DiscogContainer query={this.props.query} resultsKey={this.props.resultsKey} origin={this.props.origin} results={this.props.results}/></ListItem>;
          }
        }
        //if album search
        else if (queryType == "release_title") {
          if (result.type == "master") {
            var resultDisplay = <li key={result.uri}><img src={result.thumb}></img> {result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li>;
          }
        }
        //if song search
        else if (queryType == "track") {
          if (result.type == "master") {
            var resultDisplay = <li key={result.uri}> {result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={index} /> </li>;
          }
        }


    return (
        <div>
          {resultDisplay}
        </div>
    );
  },

});

module.exports = Result;