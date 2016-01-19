var React = require('react');

var ResultsContainer = require('./ResultsContainer.jsx');
var RaisedButton = require('material-ui/lib/raised-button');
var SelectField = require('material-ui/lib/select-field');
var TextField = require('material-ui/lib/text-field');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


var SearchForm = React.createClass ({

  render: function () {
    return (
      <div>
        <form action={this.props.formAction} method={this.props.formMethod} onSubmit={this.props.handleSubmit} >
          <div>
            <TextField className="query center-text" onChange={this.props.handleChange} hintText="Enter search..." />
          </div>
          <div>
            <SelectField menuItems={this.props.menuItems} onChange={this.props.handleSelect} />
          </div>
        </form>
        <div>
          <RaisedButton label="Search" secondary={true} onClick={this.props.handleSubmit} />
        </div>
      </div>
    );
  },

});

module.exports = SearchForm;