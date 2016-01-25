var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx');
var SearchForm = require('./SearchForm.jsx');
var SearchIndicator = require('./SearchIndicator.jsx')


var SearchContainer = React.createClass({
  getInitialState: function () {
    return {
      results: null,
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

  executeSearch: function(query) {
    $.ajax({
      url: this.props.origin + '/search',
      data: {query: query},
    })
    .done(this.successFunction)
    .fail(this.errorFunction);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.setState({showSearchResults: true, inProgress: true});
    this.executeSearch(this.state.query, this.state.queryType);
  },

  successFunction: function(response){
    this.setState({results: response, inProgress: false});
  },

  errorFunction: function(){
    this.setState({showSearchResults: false, inProgress: false});
    console.log("error");
  },

  render: function () {
    var searchResultsContainer = <ResultsContainer results={this.state.results} query={this.state.query} queryType={this.state.queryType} origin={this.props.origin} />;
    var searchIndicator = <SearchIndicator text={"Searching..."}/>;
    var searchProgress = this.state.inProgress ? searchIndicator : searchResultsContainer;
    return (
      <div>

        <SearchForm handleChange={this.handleChange} queryType={this.state.queryType} handleSelect={this.handleSelect} handleSubmit={this.handleSubmit} />

        {this.state.showSearchResults ? searchProgress : null}

      </div>
  );
  },

});

module.exports = SearchContainer;