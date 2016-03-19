var React = require('react');
var AlbumResult = require('../results/AlbumResult.jsx');
var Button = require('react-bootstrap/lib/Button');

var DiscogContainer = React.createClass({
  render: function(){
    var albums =
      this.props.albums.map(function(album, index){
        return <AlbumResult key={album.id} ajaxRequest={this.props.ajaxRequest} result={album} origin={this.props.origin} query={this.props.query} />;
      }.bind(this));

    var closeButton =
      <div className="right two-bottom">
        <Button bsStyle="danger" onClick={this.props.handleCloseClick}>CLOSE</Button>
      </div>

    var header = <div className="detail-discog-header">{this.props.title} Discography</div>

    var discog =
      <div className="details-display">
        {closeButton}
        <div className="center-text">
          {header}
        </div>
        <div className="clear-right left-text">
          {albums}
        </div>
      </div>

    var noDiscog =
      <div>
        {closeButton}
        <div className="no-results">Discography Unavailable</div>
      </div>

    var discogDisplay = (this.props.albums.length > 0) ? discog : noDiscog;

    return(
      <div>
        {discogDisplay}
      </div>
    );
  },
});

module.exports = DiscogContainer;