var React = require('react');
var Album = require('./Album.jsx')

var AlbumContainer = React.createClass ({
  getInitialState: function(){
    return {
      details: null,
      url: this.props.origin + "/album_info",
      showAlbumDetailsContainer: false,
    };
  },

  handleDetailClick: function() {
    this.executeDetail(this.props.album["id"]);
  },

  handleDetailCloseClick: function(){
    this.setState({details: null, showAlbumDetailsContainer: false});
  },

  executeDetail: function(albumKey) {
    var data = {id: albumKey};
    $.ajax({
      url: this.state.url,
      data: data,
      success: this.successFunction,
      error: this.errorFunction,
    });
  },

  successFunction: function(response){
    this.setState({details: response, showAlbumDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log("error");
  },

  render: function () {
    return (
      <Album handleDetailCloseClick={this.handleDetailCloseClick} albumTitle={this.props.albumTitle} album={this.props.album} showAlbumDetailsContainer={this.state.showAlbumDetailsContainer} details={this.state.details} albumImage={this.props.albumImage} albumYear={this.props.albumYear} handleDetailClick={this.handleDetailClick}/>
    );
  },

});

module.exports = AlbumContainer;