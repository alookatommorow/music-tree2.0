var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");

var ResultsContainer = require('../results/ResultsContainer.jsx');

var Input = require('react-bootstrap/lib/Input');
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
      <div className="search-form">
        <form onSubmit={this.props.handleSubmit} >
          <Input className="query" type="text" placeholder="Enter search..." onChange={this.props.handleChange}/>
          <Input type="select"  placeholder="Artist" onChange={this.props.handleSelect}>
            <option value='artist'>Artist</option>
            <option value="master">Album</option>
          </Input>
          <div className="search-button">
            <RaisedButton label="Search" secondary={true} labelStyle={this.props.buttonStyle} onClick={this.props.handleSubmit} />
          </div>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;