var React = require('react');
var AlbumDetailsContainer = require('../details/AlbumDetailsContainer.jsx')
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');

var DiscogAlbum = React.createClass({
  render: function(){
    var detailsContainer = <AlbumDetailsContainer tracklist={this.props.tracklist}/>
    var openButton = <RaisedButton onClick={this.props.handleDetailClick} label='Album Details'/>
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleDetailCloseClick}/>
    return (
      <div>
        <ListItem className="left-text">
          <div className='right one-bottom'>
            {this.props.showAlbumDetailsContainer ? closeButton : openButton }
          </div>
          <div>
            <img src={this.props.album.thumb} alt="Pic unavailable" className="left two-right"></img>
          </div>
          <div className="clear-right">
            <div className="bold">
              {this.props.album.title}
            </div>
            <div className="two-top">
              {this.props.album.year}
            </div>
          </div>
          <div className="clear-both"> </div>
          {this.props.showAlbumDetailsContainer ? detailsContainer : null}
        </ListItem>
        <Divider />
      </div>
    );
  },

});

module.exports = DiscogAlbum;