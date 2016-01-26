var React = require('react');
var DiscogAlbum = require('./DiscogAlbum.jsx')

var DiscogAlbumContainer = React.createClass ({
  getInitialState: function(){
    return {
      tracklist: null,
      showDetailsContainer: false,
    };
  },

  handleDetailClick: function() {
    if (this.state.tracklist === null) {
      this.executeDetail(this.props.album["id"]);
    } else {
      this.setState({showDetailsContainer: true});
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
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
    this.setState({tracklist: response.tracklist, showDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log("error");
  },

  render: function () {
    return (
      <DiscogAlbum handleDetailCloseClick={this.handleDetailCloseClick} album={this.props.album} showDetailsContainer={this.state.showDetailsContainer} tracklist={this.state.tracklist} handleDetailClick={this.handleDetailClick}/>
    );
  },

});

module.exports = DiscogAlbumContainer;