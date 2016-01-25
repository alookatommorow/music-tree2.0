var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var ArtistProfileContainer = React.createClass({

  render: function(){

    // var header = <div className="center-text detail-discog-header">{this.props.title} Profile</div>
    // var detailsDisplay = <div>{this.props.profile}</div>

    var noProfile = <div className="no-results">No Profile Available</div>
    var profile =
      <div className="details-display">
        <div className="center-text detail-discog-header">{this.props.title} Profile</div>
        <div className="left-text">
          {this.props.profile}
        </div>
      </div>
      var profileDisplay = (this.props.profile.length > 0) ? profile : noProfile;


    return (
      <div>
          {profileDisplay}
      </div>
    );
  }

});

module.exports = ArtistProfileContainer;