var React = require('react');
var ResultsContainer = require('./ResultsContainer.jsx');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');


var SearchForm = React.createClass ({

  render: function () {
    return (
      <div className="" >
        <div className="inline-block">
          <form action={this.props.formAction} method={this.props.formMethod} onSubmit={this.props.handleSubmit} >
            <TextField className="query" onChange={this.props.handleChange} hintText="Enter search..." />

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