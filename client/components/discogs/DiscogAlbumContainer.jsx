var React = require('react');
var DiscogAlbum = require('./DiscogAlbum.jsx')

var DiscogAlbumContainer = React.createClass ({
  getInitialState: function(){
    return {
      tracklist: null,
      showAlbumDetailsContainer: false,
    };
  },

  handleDetailClick: function() {
    if (this.state.tracklist === null) {
      this.executeDetail(this.props.album["id"]);
    } else {
      this.setState({showAlbumDetailsContainer: true});
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showAlbumDetailsContainer: false});
  },

  executeDetail: function(albumKey) {
    $.ajax({
      url: this.props.origin + "/album_info",
      data: {id: albumKey},
    })
    .done(this.successFunction)
    .fail(this.errorFunction);
  },

  successFunction: function(response){
    this.setState({tracklist: response.tracklist, showAlbumDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log("error");
  },

  render: function () {
    return (
      <DiscogAlbum handleDetailCloseClick={this.handleDetailCloseClick} album={this.props.album} showAlbumDetailsContainer={this.state.showAlbumDetailsContainer} tracklist={this.state.tracklist} handleDetailClick={this.handleDetailClick}/>
    );
  },

});

module.exports = DiscogAlbumContainer;