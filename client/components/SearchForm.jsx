var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx')


var SearchForm = React.createClass ({
  getInitialState: function () {
    return {
      query: "",
    };
  },

  handleChange: function() {
    this.setState({query: event.target.value});
  },

  render: function () {
    return (
      <div>

          <input className="query" type="text" placeholder="Search..." onChange={this.handleChange}></input>
          <button type="button" onClick={this.props.handleSearch(this.state.query)}>Search</button>

      </div>
    );
  },

});

module.exports = SearchForm;