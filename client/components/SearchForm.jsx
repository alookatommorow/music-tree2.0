var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx');
var RaisedButton = require('material-ui/lib/raised-button');


var SearchForm = React.createClass ({

  render: function () {
    return (
      <div className="" >
        <div className="inline-block">
          <form action={this.props.formAction} method={this.props.formMethod} onSubmit={this.props.handleSubmit} >
            <input className="query" type="text" placeholder="Search..." onChange={this.props.handleChange}></input>
            <select name="select" value={this.props.queryType} onChange={this.props.handleSelect}>
              <option value="artist">Artist</option>
              <option value="release_title">Album</option>
              <option value="track">Song</option>
            </select>
          </form>
        </div>
        <div className="inline-block search-button">
          <RaisedButton label="Search" secondary={true} onClick={this.props.handleSubmit} />
        </div>

      </div>
    );
  },

});

module.exports = SearchForm;