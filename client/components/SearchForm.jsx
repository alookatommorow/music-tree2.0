var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx')


var SearchForm = React.createClass ({

  render: function () {
    return (
      <div>
        <form action={this.props.formAction} method={this.props.formMethod} onSubmit={this.props.handleSubmit} >
          <input className="query" type="text" placeholder="Search..." onChange={this.props.handleChange}></input>
          <select name="select" value={this.props.queryType} onChange={this.props.handleSelect}>
            <option value="artist">Artist</option>
            <option value="release_title">Album</option>
            <option value="track">Song</option>
          </select>
          <input type="submit" value="Search" ></input>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;