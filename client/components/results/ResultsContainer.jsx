var React = require('react');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var NoResults = require('./NoResults.jsx');
var AlbumResult = require('./AlbumResult.jsx');
var ArtistResult = require('./ArtistResult.jsx');
var ResultsNav = require('./ResultsNav.jsx');
var Col = require('react-bootstrap/lib/Col');

var ResultsContainer = React.createClass ({
  getInitialState: function() {
    return {
      showArtistResults: true,
    };
  },

  showArtistResults: function() {
    this.setState({showArtistResults: true});
  },

  showAlbumResults: function() {
    this.setState({showArtistResults: false});
  },

  render: function () {
    var artistResults = this.props.artistResults.map(function(result, index){
        return <ArtistResult key={result.uri} result={result} ajaxRequest={this.props.ajaxRequest} origin={this.props.origin} />
      }.bind(this));

    var showArtistResults = (this.props.artistResults.length > 0) ? artistResults : <NoResults/>
    var albumResults = this.props.albumResults.map(function(result, index){
        return <AlbumResult key={result.uri} ajaxRequest={this.props.ajaxRequest} result={result} origin={this.props.origin} />
      }.bind(this));
    var showAlbumResults = (this.props.albumResults.length > 0) ? albumResults : <NoResults/>
    var searchResults = (this.props.queryType === 'artist') ? showArtistResults : showAlbumResults;
    var resultsNav = <ResultsNav showArtistResults={this.showArtistResults} showAlbumResults={this.showAlbumResults} toggleSearchForm={this.props.toggleSearchForm} />;

    return (
      <Col lg={12}>
        {resultsNav}
        <ListGroup>
          {this.state.showArtistResults ? showArtistResults : showAlbumResults }
        </ListGroup>
      </Col>
    );
  },
});

module.exports = ResultsContainer;