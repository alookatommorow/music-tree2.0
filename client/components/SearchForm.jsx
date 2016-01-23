var React = require('react');

var ResultsContainer = require('./ResultsContainer.jsx');
var RaisedButton = require('material-ui/lib/raised-button');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var TextField = require('material-ui/lib/text-field');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


var SearchForm = React.createClass ({

  render: function () {
    return (
      <div className="search-form center-text" >
        <form onSubmit={this.props.handleSubmit} >
          <div>
            <TextField className="query" onChange={this.props.handleChange} hintText="Enter search..." />
          </div>
          <div>
          <SelectField  value={this.props.queryType} onChange={this.props.handleSelect}>
              <MenuItem value={'artist'} primaryText="Artist"/>
              <MenuItem value={'master'} primaryText="Album"/>
          </SelectField>
          </div>
          <div className="search-button">
            <RaisedButton label="Search" secondary={true} onClick={this.props.handleSubmit} />
          </div>
        </form>

      </div>
    );
  },

});

module.exports = SearchForm;