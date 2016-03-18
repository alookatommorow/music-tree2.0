var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");

var ResultsContainer = require('../results/ResultsContainer.jsx');

var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var MenuItem = require('material-ui/lib/menus/menu-item');


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
            <Button id="search-button" bsStyle="primary" onClick={this.props.handleSubmit}>Search</Button>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;