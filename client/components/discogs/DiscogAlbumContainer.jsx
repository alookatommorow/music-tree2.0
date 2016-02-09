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
      this.props.ajaxRequest(this.props.album["id"], '/album_info', this.successFunction, this.errorFunction )
    } else {
      this.setState({showDetailsContainer: true});
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
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