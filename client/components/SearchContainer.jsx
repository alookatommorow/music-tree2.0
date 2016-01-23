var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx')
var SearchForm = require('./SearchForm.jsx')

var SearchContainer = React.createClass({
  getInitialState: function () {
    return {
      results: null,
      url: this.props.origin + '/search',
      formMethod: 'get',
      query: null,
      queryType: "artist",
      showSearchResults: false,
    };
  },

  handleChange: function(event) {
    this.setState({query: event.target.value});
  },

  handleSelect: function(event, index, value){
    this.setState({queryType: value});
  },

  executeSearch: function(query) {
    var data = {query: query};
    var url = this.state.url;

    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      success: this.successFunction,
      error: this.errorFunction,
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.executeSearch(this.state.query, this.state.queryType);
  },

  successFunction: function(response){
    this.setState({results: response, showSearchResults: true});
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function () {
    var searchResultsContainer = <ResultsContainer results={this.state.results} query={this.state.query} queryType={this.state.queryType} origin={this.props.origin} />
    return (
      <div>
        <div >
          <SearchForm handleChange={this.handleChange} queryType={this.state.queryType} handleSelect={this.handleSelect} formAction={this.state.formAction} formMethod={this.state.formMethod} handleSubmit={this.handleSubmit} />
        </div>
        <div className='results-container'>
          {this.state.showSearchResults ? searchResultsContainer: null}
        </div>
      </div>
    );
  },
});

module.exports = SearchContainer;