var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');
var AlbumContainer = require('./AlbumContainer.jsx');

var DiscogContainer = React.createClass({

  render: function(){
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleCloseClick}/>
    var sortedAlbums = this.props.albums.sort(function(a, b){
      return a.year - b.year;
    });
    var header = <div>{this.props.title} Discography</div>
    var discogDisplay = sortedAlbums.map(function(album, index){
      if (album["type"] === "master"){
        return <AlbumContainer key={album.resource_url} albumTitle={album.title} albumYear={album.year} />
      }
    });
      // var discogDisplay = albums.map(function(album){
      //     return <div>{album.title}</div>
      // });
      // var albums = this.state.details.sort(function(a, b){
      //   return a.year - b.year;
      // });
      // var discogDisplay = this.state.details.map(function(album){
      //   console.log("nutsa");
      //   if (album["type"] !== "release"){
      //     return <div>{album.title}</div>
      //   }
      // });

    return(
        <div className="details-display">
          <div className="right">
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