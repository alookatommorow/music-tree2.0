var React = require('react');
var update = require('react-addons-update');
var AlbumResult = require('../results/AlbumResult.jsx');
var createReactClass = require('create-react-class');

var Discog = createReactClass({
  render: function(){
    var noDiscog =
      <div>
        <div className="no-results">Discography Unavailable</div>
      </div>
    var discografia = this.props.albums[this.props.pageNum].map(function(album){
      return <AlbumResult key={album.id} ajaxRequest={this.props.ajaxRequest} result={album} />;
    }.bind(this));

    return(
      <div>
        {this.props.albums[this.props.pageNum].length > 0 ? discografia : noDiscog}
      </div>
    );
  },
});

module.exports = Discog;