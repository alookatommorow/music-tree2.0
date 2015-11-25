var React = require('react');

var DetailsContainer = React.createClass({
  getInitialState: function(){
    return {
      details: null,
      artist_search_url: this.props.origin + "/artist_search",
      album_search_url: this.props.origin + "/album_search",
    };
  },

  handleDetailClick: function() {
    this.executeDetail(this.props.resultsKey);
  },

  executeDetail: function(resultsKey) {
    var data = {id: this.props.results[resultsKey]["id"]};
    if (this.props.queryType == "artist"){
      var url = this.state.artist_search_url;
    } else if (this.props.queryType == "release_title"){
      var url = this.state.album_search_url;
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
    this.setState({details: response});
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function(){
    if (this.state.details !== null) {
      var detailsDisplay = this.state.details["profile"]
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
        </div>
      );
  },

});

module.exports = DetailsContainer;