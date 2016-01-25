var React = require('react');
var List = require('material-ui/lib/lists/list');
var Result = require('./Result.jsx');
var NoResults = require('./NoResults.jsx');
var AlbumResult = require('./AlbumResult.jsx');
var ArtistResult = require('./ArtistResult.jsx');

var ResultsContainer = React.createClass ({

  render: function () {
    // var noResults = <NoResults/>;

    // if (this.props.result.thumb === "") {
    //   picSource = "https://storage.googleapis.com/west-coast-skateparks/muisc-tree-alt.jpg"
    // } else {
    //   picSource = this.props.result.thumb
    // }

    var artistResults = this.props.artistResults.map(function(result, index){
        return <ArtistResult key={result.uri} result={result} origin={this.props.origin} query={this.props.query} queryType={this.props.queryType} results={this.props.artistResults} resultsKey={index} />
      }.bind(this));

    var albumResults = this.props.albumResults.map(function(result, index){
        return <AlbumResult key={result.uri} result={result} origin={this.props.origin} query={this.props.query} queryType={this.props.queryType} results={this.props.albumResults} resultsKey={index} />
      }.bind(this));

    var showArtistResults = (this.props.artistResults.length > 0) ? artistResults : <NoResults/>
    var showAlbumResults = (this.props.albumResults.length > 0) ? albumResults : <NoResults/>
    var searchResults = (this.props.queryType === 'artist') ? showArtistResults : showAlbumResults;

    return (
        <div className='results-container'>
          <List>
            {searchResults}
          </List>
        </div>
    );
  },

});

module.exports = ResultsContainer;