var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var DetailsContainer = React.createClass ({

  render: function(){
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleCloseClick}/>
    if (this.props.queryType == "artist"){
      var header = <div>{this.props.title} Profile</div>
      var detailsDisplay = <div>{this.props.details['profile']}</div>
    }
    else if (this.props.queryType == "master") {
      var header = <div>Tracklist</div>
      var detailsDisplay = this.props.details['tracklist'].map(function(track, index){
        return <div>{index+1}. {track['title']}</div>
      });
    }

    return (
        <div className="details-display">
          <div className="right two-bottom">
            {closeButton}
          </div>
          <div className="left-text bold">
            {header}
          </div>
          <div className="left-text clear-right">
            {detailsDisplay}
          </div>
        </div>
      );
  },

});

module.exports = DetailsContainer;