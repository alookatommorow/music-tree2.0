var React = require('react');


var Album = require('./Album.jsx')

var AlbumContainer = React.createClass ({
  getInitialState: function(){
    return {
      details: null,
      url: this.props.origin + "/album_info",
      showCloseButton: false,
    };
  },

  handleDetailClick: function() {
    this.executeDetail(this.props.key);
  },

  executeDetail: function(albumKey) {
    $.ajax({
      url: this.state.url,
      data: albumKey,
      dataType: 'json',
      success: this.successFunction,
      error: this.errorFunction,
    });
  },

  successFunction: function(response){
    this.setState({details: response, showCloseButton: true});
  },

  render: function () {
    return (
      <Album albumTitle={this.props.albumTitle} albumYear={this.props.albumYear} handleDetailClick={this.handleDetailClick}/>
    );
  },

});

module.exports = AlbumContainer;