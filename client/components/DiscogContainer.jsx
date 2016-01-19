var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');
var AlbumContainer = require('./AlbumContainer.jsx');

var DiscogContainer = React.createClass({

  render: function(){
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleCloseClick}/>
    var header = <div>{this.props.title} Discography</div>
    var discogDisplay = this.props.albums.map(function(album, index){
      return <AlbumContainer albums={this.props.albums} origin={this.props.origin} key={album.uri} album={album} albumKey={index} albumImage={album.thumb} albumTitle={album.title} albumYear={album.year} />
    }.bind(this));

    return(
      <div className="details-display">
        <div className="right two-bottom">
          {closeButton}
        </div>
        <div className="left-text bold">
          {header}
        </div>
        <div className="clear-right left-text">
          {discogDisplay}
        </div>
      </div>
    )
  },

});

module.exports = DiscogContainer;