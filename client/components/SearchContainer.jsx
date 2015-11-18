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
    };
  },
  executeSearch: function() {
    console.log("executing search");
    var data = {
      query: this.state.query,
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
    console.log(SearchForm.refs.query)
    // var firstName = React.findDOMNode(this.refs.firstName).getValue()
    this.setState({query: event.target.value});
    console.log("hella tite");
    console.log(this.state.formAction);
    this.executeSearch();
  },
  successFunction: function(response){
    console.log("success");
    console.log(response["results"].length);
    this.setState({results: response["results"]});
  },
  errorFunction: function(){
    console.log("error");
  },
  render: function () {
    return (
      <div className='center-text'>
        <SearchForm formAction={this.state.formAction} formMethod={this.state.formMethod} handleSubmit={this.handleSubmit}/>
        <ResultsContainer results={this.state.results}/>
      </div>
    );
  },
});

module.exports = SearchContainer;