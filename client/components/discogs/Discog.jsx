var React = require('react');
var AlbumResult = require('../results/AlbumResult.jsx');
var Button = require('react-bootstrap/lib/Button');
var Pagination = require('react-bootstrap/lib/Pagination');
var SearchIndicator = require('../search/SearchIndicator.jsx');
var update = require('react-addons-update');

var Discog = React.createClass({

  render: function(){
    console.log("rendering")

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