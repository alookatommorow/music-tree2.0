var React = require('react');
var ListItem = require('material-ui/lib/lists/list-item');

var Album = React.createClass ({
  render: function () {

    return (
        <div>
          <ListItem>{this.props.albumTitle} {this.props.albumYear}</ListItem>
        </div>
    );
  },

});

module.exports = Album;