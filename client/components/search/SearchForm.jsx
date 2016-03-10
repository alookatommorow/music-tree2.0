var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");

var ResultsContainer = require('../results/ResultsContainer.jsx');

var RaisedButton = require('material-ui/lib/raised-button');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var TextField = require('material-ui/lib/text-field');



injectTapEventPlugin();

var SearchForm = React.createClass ({

  render: function () {

    var queryStyle = {
      fontFamily: "Muli"
    }
    return (
      <div>
        <form onSubmit={this.props.handleSubmit} >
          <div>
            <TextField className="query" inputStyle={queryStyle} onChange={this.props.handleChange} hintText="Enter search..." />
          </div>
          <div>
            <SelectField value={this.props.queryType} onChange={this.props.handleSelect}>
              <MenuItem value={'artist'} primaryText="Artist"/>
              <MenuItem value={'master'} primaryText="Album"/>
            </SelectField>
          </div>
          <div className="search-button">
            <RaisedButton label="Search" secondary={true} labelStyle={this.props.buttonStyle} onClick={this.props.handleSubmit} />
          </div>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;