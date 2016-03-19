var React = require('react')
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');



var SearchNav = React.createClass({
  render: function() {
    return (
      <div className="two-bottom">
        <ButtonGroup justified >
          <Button href="#" onClick={this.props.showArtistResults} >Artists</Button>
          <Button href="#" onClick={this.props.showAlbumResults} >Albums</Button>
          <Button href="#" onClick={this.props.showSearchForm}>Search</Button>
        </ButtonGroup>
      </div>
    );
  }

});

module.exports = SearchNav;