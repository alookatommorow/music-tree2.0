var React = require('react');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var NoResults = require('./NoResults.jsx');
var AlbumResult = require('./AlbumResult.jsx');
var ArtistResult = require('./ArtistResult.jsx');


var ResultsContainer = React.createClass ({
  render: function () {
    var closeButtonStyle = {
      textTransform: 'capitalize',
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: 'red',
      cursor: 'hover'
    }
    var artistResults = this.props.artistResults.map(function(result, index){
        return <ArtistResult closeButtonStyle={closeButtonStyle} buttonStyle={this.props.buttonStyle} key={result.uri} result={result} ajaxRequest={this.props.ajaxRequest} origin={this.props.origin} />
      }.bind(this));

    var showArtistResults = (this.props.artistResults.length > 0) ? artistResults : <NoResults/>

    var albumResults = this.props.albumResults.map(function(result, index){
        return <AlbumResult closeButtonStyle={closeButtonStyle} buttonStyle={this.props.buttonStyle} key={result.uri} ajaxRequest={this.props.ajaxRequest} result={result} origin={this.props.origin} />
      }.bind(this));
    var showAlbumResults = (this.props.albumResults.length > 0) ? albumResults : <NoResults/>
    var searchResults = (this.props.queryType === 'artist') ? showArtistResults : showAlbumResults;

    return (
      <div>
        <ListGroup>
          {searchResults}
        </ListGroup>
      </div>
    );
  },
});

module.exports = ResultsContainer;