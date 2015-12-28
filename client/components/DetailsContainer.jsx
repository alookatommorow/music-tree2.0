var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');

var DetailsContainer = React.createClass({

  render: function(){
    var closeButton = <FlatButton label='Close' onClick={this.props.handleCloseClick}/>
    if (this.props.details !== null) {
      if (this.props.queryType == "artist"){
        var detailsDisplay = <div>{this.props.details['profile']}</div>
      }
      else if (this.props.queryType == "release_title") {
        var albumYear
        var detailsDisplay = this.props.details['tracklist'].map(function(track, index){
          return <div><div>{index+1}. {track['title']}</div></div>
        });
      }

    };
    return (
        <div className="details-display">
          <div className="right one-left">
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