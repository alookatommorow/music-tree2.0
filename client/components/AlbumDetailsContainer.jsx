var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var AlbumDetailsContainer = React.createClass({

  render: function(){

    var header = <div>Tracklist</div>
    var detailsDisplay = this.props.details['tracklist'].map(function(track, index){
        return <div key={index}>{index+1}. {track['title']}</div>
      });

    return (
      <div className="details-display">
        <div className="left-text bold two-bottom">
          {header}
        </div>
        <div className="left-text">
          {detailsDisplay}
        </div>
      </div>
    );
  }

});

module.exports = AlbumDetailsContainer;
