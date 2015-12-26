var React = require('react');

var DetailsContainer = React.createClass({

  render: function(){
    var closeButton = <div><button onClick={this.props.handleCloseClick}>Close</button></div>
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
        <div className="detailsDisplay">
          {detailsDisplay}
          {this.props.showCloseButton ? closeButton : null}
        </div>
      );
  },

});

module.exports = DetailsContainer;