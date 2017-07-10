var React = require('react')
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var createReactClass = require('create-react-class');

var SearchNav = createReactClass({
  render: function() {
    return (
      <div className="two-bottom">
        <ButtonGroup justified bsSize="large" >
          <Button href="#" onClick={this.props.toggleQueryType} target="artist">Artists</Button>
          <Button href="#" onClick={this.props.toggleQueryType} target="master">Albums</Button>
          <Button href="#" onClick={this.props.toggleSearchForm}>Search</Button>
        </ButtonGroup>
      </div>
    );
  }
});

module.exports = SearchNav;