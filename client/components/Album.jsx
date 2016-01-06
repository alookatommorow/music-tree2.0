var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');
var ListItem = require('material-ui/lib/lists/list-item');

var Album = React.createClass({
  render: function(){
    return (
      <ListItem>{this.props.albumTitle} {this.props.albumYear} <FlatButton onClick={this.props.handleClick} className='' label='Album Details'/> </ListItem>
    );
  },

});

module.exports = Album;