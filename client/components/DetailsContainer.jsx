var React = require('react');

var DetailsContainer = React.createClass({
  getInitialState: function(){
    return {
      details: this.props.details,
      artist_info_url: this.props.origin + "/artist_info",
      album_info_url: this.props.origin + "/album_info",
    };
  },

  handleDetailClick: function() {
    this.executeDetail(this.props.resultsKey);
  },

  executeDetail: function(resultsKey) {
    var data = {id: this.props.results[resultsKey]["id"]};
    if (this.props.queryType == "artist"){
      var url = this.state.artist_info_url;
    } else if (this.props.queryType == "release_title"){
      console.log(data);
      var url = this.state.album_info_url;
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
    console.log(response);
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function(){
    if (this.state.details !== null) {
      if (this.props.queryType == "artist"){
        var detailsDisplay = <div>{this.state.details['profile']}</div>
      }
      else if (this.props.queryType == "release_title") {
        var detailsDisplay = <button onClick={this.handleDetailClick}>Album Details</button>
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
        </div>
      );
  },

});

module.exports = DetailsContainer;