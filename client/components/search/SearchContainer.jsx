var React = require('react');
var ResultsContainer = require('../results/ResultsContainer.jsx');
var SearchForm = require('./SearchForm.jsx');
var SearchIndicator = require('./SearchIndicator.jsx');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var SearchContainer = React.createClass({
  getInitialState: function () {
    return {
      artistResults: null,
      albumResults: null,
      query: null,
      queryType: "artist",
      showSearchResults: false,
      showSearchForm: true,
      inProgress: false,
    };
  },

  handleChange: function(event) {
    this.setState({query: event.target.value});
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
    this.setState({showSearchForm: false, showSearchResults: true, inProgress: true});
    this.ajaxRequest(this.state.query, '/search', this.successFunction, this.errorFunction);
  },

  toggleSearchForm: function(event) {
    event.preventDefault();
    this.state.showSearchForm ? this.setState({showSearchForm: false}) : this.setState({showSearchForm: true})
  },

  toggleQueryType: function(event) {
    event.preventDefault();
    var type
    if (event.target.value == null) {
      type = event.target.target;
    } else {
      type = event.target.value;
    }
    this.setState({queryType: type});
  },

  successFunction: function(response){
    this.setState({artistResults: response.artistResults, albumResults: response.albumResults, inProgress: false})
  },

  errorFunction: function(){
    this.setState({showSearchResults: false, inProgress: false});
    console.log("error");
  },

  render: function () {
    var searchResultsContainer = <ResultsContainer ajaxRequest={this.ajaxRequest} albumResults={this.state.albumResults} artistResults={this.state.artistResults} query={this.state.query} queryType={this.state.queryType} origin={this.props.origin} toggleQueryType={this.toggleQueryType} toggleSearchForm={this.toggleSearchForm} />;
    var searchIndicator = <SearchIndicator text={"Searching..."}/>;
    var searchProgress = this.state.inProgress ? searchIndicator : searchResultsContainer;
    var searchForm = <SearchForm handleChange={this.handleChange} queryType={this.state.queryType} toggleQueryType={this.toggleQueryType} handleSubmit={this.handleSubmit} />

    return (
      <div>
        <div>
          {this.state.showSearchForm ? searchForm : null }
        </div>
        <div>
          {this.state.showSearchResults ? searchProgress : null}
        </div>
      </div>
    );
  },
});

module.exports = SearchContainer;