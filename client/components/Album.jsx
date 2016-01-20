var React = require('react');
var AlbumDetailsContainer = require('./AlbumDetailsContainer.jsx')
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');

var Album = React.createClass({
  render: function(){
    var detailsContainer = <AlbumDetailsContainer details={this.props.details}/>
    var openButton = <RaisedButton onClick={this.props.handleDetailClick} label='Album Details'/>
    var closeButton = <RaisedButton label='Close' onClick={this.props.handleDetailCloseClick}/>
    return (
      <div>
        <ListItem className="left-text">
          <div className='right'>
            {this.props.showAlbumDetailsContainer ? closeButton : openButton }
          </div>
          <div>
            <img src={this.props.albumImage} alt="Pic unavailable" className="left two-right"></img>
          </div>
          <div className="album-result-title">
            <div className="bold">
              {this.props.albumTitle}
            </div>
            <div className="two-top">
              {this.props.albumYear}
            </div>
          </div>
          <div className="clear-both"> </div>
        </ListItem>
        {this.props.showAlbumDetailsContainer ? detailsContainer : null}
        <Divider />
      </div>
    );
  },

});

module.exports = Album;