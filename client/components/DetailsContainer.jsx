var React = require('react');

var DetailsContainer = React.createClass({
  getInitialState: function(){
    return {
      details: null,
      discogDetails: null,
      artistInfoUrl: this.props.origin + "/artist_info",
      albumInfoUrl: this.props.origin + "/album_info",
      discogUrl: this.props.orgin + "/discog",
      showCloseButton: false,

    };
  },

  handleDetailClick: function() {
    this.executeDetail(this.props.resultsKey);
  },

  executeDetail: function(resultsKey) {
    var data = {id: this.props.results[resultsKey]["id"]};
    if (this.props.queryType == "artist"){
      var url = this.state.artistInfoUrl;
    } else if (this.props.queryType == "release_title"){
      var url = this.state.albumInfoUrl;
    }

    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      success: this.successFunction,
      error: this.errorFunction,
    });
  },

  successFunction: function(response){
    this.setState({details: response, showCloseButton: true});
  },

  errorFunction: function(){
    console.log("error");
  },

  handleCloseClick: function(){
    this.setState({details: null, showCloseButton: false});
  },

  render: function(){
    var closeButton = <div><button onClick={this.handleCloseClick}>Close</button></div>
    if (this.state.details !== null) {
      if (this.props.queryType == "artist"){
        var detailsDisplay = <div>{this.state.details['profile']}</div>
      }
      else if (this.props.queryType == "release_title") {
        var albumYear
        var detailsDisplay = this.state.details['tracklist'].map(function(track, index){
          return <div><div>{index+1}. {track['title']}</div></div>
        });
      }

    } else {
      if (this.props.queryType == "artist"){
        var detailsDisplay = <button onClick={this.handleDetailClick}>Artist Details</button>
      }
      else if (this.props.queryType == "release_title") {
        var detailsDisplay = <button onClick={this.handleDetailClick}>Album Details</button>
      }
    };
    return (
        <div className="detailsDisplay">
          {detailsDisplay}
          {this.state.showCloseButton ? closeButton : null}
        </div>
      );
  },

});

module.exports = DetailsContainer;