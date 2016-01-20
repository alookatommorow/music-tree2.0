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
    if (this.state.details === null) {
      this.executeDetail(this.props.album["id"]);
    } else {
      this.setState({showAlbumDetailsContainer: true});
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showAlbumDetailsContainer: false});
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
      <Album handleDetailCloseClick={this.handleDetailCloseClick} album={this.props.album} showAlbumDetailsContainer={this.state.showAlbumDetailsContainer} details={this.state.details} handleDetailClick={this.handleDetailClick}/>
    );
  },

});

module.exports = AlbumContainer;