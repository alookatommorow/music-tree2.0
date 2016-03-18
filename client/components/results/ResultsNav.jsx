var React = require('react')
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Row = require('react-bootstrap/lib/Row');


var SearchNav = React.createClass({
  render: function() {
    return (
      <div className="results-nav">
        <ButtonGroup>
          <Button onClick={this.props.changeQueryType} value="artist" >Artists</Button>
          <Button onClick={this.props.changeQueryType} value="master" >Albums</Button>
          <Button onClick={this.props.showSearchForm}>Search</Button>
        </ButtonGroup>
      </div>
    );
  }

});

module.exports = SearchNav;