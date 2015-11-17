var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx')


var SearchForm = React.createClass ({
  render: function () {
    return (
      <div>
        <form action={this.props.formAction} method={this.props.formMethod} onSubmit={this.props.handleSubmit}>
          <input className="query" type="text" ref="query" placeholder="Search..." ></input>
          <input type="submit" value="Search"></input>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;