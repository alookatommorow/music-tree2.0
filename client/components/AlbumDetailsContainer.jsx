var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var AlbumDetailsContainer = React.createClass({

  render: function(){
    console.log(this.props.album.format);
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleDetailCloseClick}/>
    var header = <div>Tracklist</div>
    var detailsDisplay = this.props.details['tracklist'].map(function(track, index){
        return <div key={index}>{index+1}. {track['title']}</div>
      });

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
  }

});

module.exports = AlbumDetailsContainer;
