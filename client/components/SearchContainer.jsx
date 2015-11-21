var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx')
var SearchForm = require('./SearchForm.jsx')

var SearchContainer = React.createClass({
  getInitialState: function () {
    return {
      results: null,
      formAction: 'http://localhost:3000/search',
      formMethod: 'get',
      query: null,
      queryType: "artist",
    };
  },
  handleChange: function(event) {
    this.setState({query: event.target.value});
  },

  handleSelect: function(event){
    console.log(event.target.value)
    this.setState({queryType: event.target.value});

  },

  executeSearch: function(query) {
    var data = {
      query: query,
    };
    console.log(data);
    $.ajax({
      url: this.state.formAction,
      data: data,
      dataType: 'json',
      success: this.successFunction,
      error: this.errorFunction,
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.executeSearch(this.state.query);
  },
  successFunction: function(response){
    this.setState({results: response});
    console.log(this.state.results)
  },
  errorFunction: function(){
    console.log("error");
  },
  render: function () {
    return (
      <div className='center-text'>
        <SearchForm handleChange={this.handleChange} handleSelect={this.handleSelect} formAction={this.state.formAction} formMethod={this.state.formMethod} handleSubmit={this.handleSubmit} />
        <ResultsContainer results={this.state.results} queryType={this.state.queryType} />
      </div>
    );
  },
});

module.exports = SearchContainer;