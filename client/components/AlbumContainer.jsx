var React = require('react');
var ListItem = require('material-ui/lib/lists/list-item');
var FlatButton = require('material-ui/lib/flat-button');
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
        <div>
          <ListItem>{this.props.albumTitle} {this.props.albumYear} <FlatButton onClick={this.handleClick} className='' label='Album Details'/> </ListItem>
        </div>
    );
  },

});

module.exports = AlbumContainer;