var React = require('react');


var SearchForm = React.createClass ({
  getInitialState: function(){
    return {
      formAction: 'http://localhost:3000/search',
      formMethod: 'get',
    }
  },

  executeSearch: function() {
    console.log("executing search");
    var data = {
      query: this.refs.query.value,
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
    // var firstName = React.findDOMNode(this.refs.firstName).getValue()

    console.log("hella tite");
    console.log(this.state.formAction);
    this.executeSearch();
  },

  successFunction: function(response){
    console.log("success");
    for (var i = 0; i < response.length; i++) {
      console.log(response[i][type]);
    }
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function () {
    return (
      <div>
        <form action={this.state.formAction} method={this.state.formMethod} onSubmit={this.handleSubmit}>
          <input type="text" ref="query" placeholder="Search..." ></input>
          <input type="submit" value="Search"></input>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;