var React = require('react')
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');


var SearchNav = React.createClass({
  render: function() {
    return (
     <ButtonGroup>
        <Button>Artists</Button>
        <Button>Albums</Button>
        <Button>Search</Button>
      </ButtonGroup>
    );
  }

});

module.exports = SearchNav;