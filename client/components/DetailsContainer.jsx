var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var DetailsContainer = React.createClass ({

  render: function(){
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleCloseClick}/>
    if (this.props.details !== null) {
      if (this.props.queryType == "artist"){
        var header = <div className="center-text two-bottom">{this.props.result.title} Profile</div>
        var detailsDisplay = <div>{this.props.details['profile']}</div>
      }
      else if (this.props.queryType == "release_title") {

        var detailsDisplay = this.props.details['tracklist'].map(function(track, index){
          return <div><div>{index+1}. {track['title']}</div></div>
        });
      }

    };
    return (
        <div className="details-display">
          <div className="center-text one-bottom">
            {header}
          </div>
          <div className="right four-left two-bottom">
            {this.props.showCloseButton ? closeButton : null}
          </div>
          <div className="left-text">
            {detailsDisplay}
          </div>
        </div>
      );
  },

});

module.exports = DetailsContainer;