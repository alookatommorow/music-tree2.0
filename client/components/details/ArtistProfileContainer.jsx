var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var Well = require('react-bootstrap/lib/Well');

var ArtistProfileContainer = React.createClass({
  render: function(){
    var closeButton =
      <Button bsStyle="danger" onClick={this.props.handleCloseClick} >CLOSE</Button>

    var noProfile =
      <div>
        <div className="right two-bottom">{closeButton}</div>
        <div className="no-results">Profile Unavailable</div>
      </div>

    var profile =
      <div className="details-display">
        <div className="right two-bottom" >
          {closeButton}
        </div>
        <Well className="center-text detail-discog-header">{this.props.title} Profile</Well>
        <Well className="left-text">{this.props.profile}</Well>
      </div>;
    var profileDisplay = (this.props.profile.length > 0) ? profile : noProfile;

    return (
      <div>
        {profileDisplay}
      </div>
    );
  }
});

module.exports = ArtistProfileContainer;