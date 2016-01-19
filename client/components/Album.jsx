var React = require('react');
var AlbumDetailsContainer = require('./AlbumDetailsContainer.jsx')
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');

var Album = React.createClass({
  render: function(){
    var detailsContainer = <AlbumDetailsContainer handleDetailCloseClick={this.props.handleDetailCloseClick} details={this.props.details}/>
    return (
      <div>
        <ListItem className="left-text">
          <div className='right'>
            <RaisedButton onClick={this.props.handleDetailClick} label='Album Details'/>
          </div>
          <div className="left two-right">
            <img src={this.props.albumImage} alt="Pic unavailable"></img>
          </div>
          <div className="album-result-title">
            <div className="bold">
              {this.props.albumTitle}
            </div>
            <div className="ten-top">
              {this.props.albumYear}
            </div>
          </div>
          <div className="clear-both"> </div>
        </ListItem>
        {this.props.showAlbumDetailsContainer ? detailsContainer : null}
      </div>
    );
  },

});

module.exports = Album;