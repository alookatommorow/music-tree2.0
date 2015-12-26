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
            var resultDisplay = <div><ListItem leftAvatar={<Avatar src={this.props.picSource} size={75} />} > {this.props.result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={this.props.resultsKey} /> <DiscogContainer query={this.props.query} resultsKey={this.props.resultsKey} origin={this.props.origin} results={this.props.results}/></ListItem></div>;
          }
        }
        //if album search
        else if (this.props.queryType == "release_title") {
          if (this.props.result.type == "master") {
            var resultDisplay = <div><ListItem leftAvatar={<Avatar src={this.props.picSource} size={75} />} > {this.props.result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={this.props.resultsKey} /> </ListItem></div>;
          }
        }
        //if song search
        else if (this.props.queryType == "track") {
          if (this.props.result.type == "master") {
            var resultDisplay = <div><ListItem> {this.props.result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={this.props.resultsKey} /> </ListItem></div>;
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