var React = require('react');

var ResultsContainer = require('../results/ResultsContainer.jsx');
var SearchForm = require('./SearchForm.jsx');
var SearchIndicator = require('./SearchIndicator.jsx')

var SearchContainer = React.createClass({
  getInitialState: function () {
    return {
      artistResults: null,
      albumResults: null,
      query: null,
      queryType: "artist",
      showSearchResults: false,
      inProgress: false,
    };
  },

  handleChange: function(event) {
    this.setState({query: event.target.value});
  },

  handleSelect: function(event, index, value){
    this.setState({queryType: value});
  },

  ajaxRequest: function(query, url, successFunction, errorFunction){
    $.ajax({
      url: this.props.origin + url,
      data: {query: query},
    })
    .done(successFunction)
    .fail(errorFunction);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.setState({showSearchResults: true, inProgress: true});
    this.ajaxRequest(this.state.query, '/search', this.successFunction, this.errorFunction);
  },

  successFunction: function(response){
    this.setState({artistResults: response.artistResults, albumResults: response.albumResults, inProgress: false})
  },

  errorFunction: function(){
    this.setState({showSearchResults: false, inProgress: false});
    console.log("error");
  },

  render: function () {
    var buttonStyle = {
      textTransform: 'capitalize',
      fontSize: '1.2em',
      fontWeight: 'bold'
    }
    var searchResultsContainer = <ResultsContainer buttonStyle={buttonStyle} ajaxRequest={this.ajaxRequest} albumResults={this.state.albumResults} artistResults={this.state.artistResults} query={this.state.query} queryType={this.state.queryType} origin={this.props.origin} />;
    var searchIndicator = <SearchIndicator text={"Searching..."}/>;
    var searchProgress = this.state.inProgress ? searchIndicator : searchResultsContainer;

    return (
      <div>
        <SearchForm buttonStyle={buttonStyle} handleChange={this.handleChange} queryType={this.state.queryType} handleSelect={this.handleSelect} handleSubmit={this.handleSubmit} />
        {this.state.showSearchResults ? searchProgress : null}
      </div>
    );
  },

});

module.exports = SearchContainer;