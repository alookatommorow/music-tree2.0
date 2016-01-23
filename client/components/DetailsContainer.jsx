var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var DetailsContainer = React.createClass({


  render: function(){
    var header, detailsDisplay;
    if (this.props.queryType == "artist"){
      if (this.props.details['profile'] === "") {
        header = <div>No Profile Available</div>
      } else {
      header = <div className="center-text detail-discog-header">{this.props.title} Profile</div>
      detailsDisplay = <div>{this.props.details['profile']}</div>
      }
    }
    else if (this.props.queryType == "master") {
      header = <div className="bold one-bottom">Tracklist</div>
      detailsDisplay = this.props.details['tracklist'].map(function(track, index){
        return <div key={this.props.title+track['title']}>{index+1}. {track['title']}</div>
      }.bind(this));
    }

    return (
      <div className="details-display">
        {header}
        <div className="left-text">
          {detailsDisplay}
        </div>
      </div>
    );
  },

});

module.exports = DetailsContainer;