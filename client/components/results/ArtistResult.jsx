var React = require('react');
var ArtistProfileContainer = require('../details/ArtistProfileContainer.jsx');
var DiscogContainer = require('../discogs/DiscogContainer.jsx');
var SearchIndicator = require('../search/SearchIndicator.jsx');

var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var ArtistResult = React.createClass({
  getInitialState: function(){
    return {
      profile: null,
      discogDetails: null,
      profileInProgress: false,
      discogInProgress: false,
      showDiscogContainer: false,
      showProfileContainer: false,
    };
  },

  handleProfileClick: function(event) {
    event.preventDefault();
    if (this.state.profile === null) {
      var query = this.props.result["id"];
      this.setState({profileInProgress: true, showProfileContainer: true});
      this.props.ajaxRequest(query, '/artist_info', this.profileSuccessFunction, this.errorFunction);
    } else {
      this.setState({showProfileContainer: true})
    }
  },

  handleDiscogClick: function(event) {
    event.preventDefault();
    if (this.state.discogDetails === null) {
      var query = this.props.result["id"]
      this.setState({discogInProgress: true, showDiscogContainer: true});
      this.props.ajaxRequest(query, '/discog', this.discogSuccessFunction, this.errorFunction);
    } else {
      this.setState({showDiscogContainer: true});
    }
  },

  handleDiscogCloseClick: function(){
    this.setState({showDiscogContainer: false});
  },

  handleProfileCloseClick: function(){
    this.setState({showProfileContainer: false});
  },

  profileSuccessFunction: function(response) {
    this.setState({profile: response.profile, profileInProgress: false});
  },

  discogSuccessFunction: function(response) {
    this.setState({discogDetails: response.all, discogInProgress: false})
  },

  render: function(){
    var picSource
    if (this.props.result.thumb === "") {
      picSource = "https://storage.googleapis.com/music-tree/music-tree-alt.jpg"
    } else {
      picSource = this.props.result.thumb
    }
    var generateButton = function(text, clickHandler) {
      return <Button href="#" bsStyle="primary" bsSize="small" onClick={clickHandler}>{text}</Button>
    }
    var profileContainer =
      <ArtistProfileContainer handleCloseClick={this.handleProfileCloseClick} title={this.props.result.title}  profile={this.state.profile} queryType={this.props.queryType} />
    var profileOpenButton = generateButton("Artist Profile", this.handleProfileClick)
    var discogOpenButton = generateButton("Discography", this.handleDiscogClick)

    var profileSearchIndicator = <SearchIndicator text={"Fetching Profile..."}/>
    var profileProgress = this.state.profileInProgress ? profileSearchIndicator : profileContainer;

    var discogContainer = <DiscogContainer inProgress={this.state.discogInProgress} origin={this.props.origin} title={this.props.result.title} handleCloseClick={this.handleDiscogCloseClick} ajaxRequest={this.props.ajaxRequest} albums={this.state.discogDetails} eps={this.state.eps} lps={this.state.lps}/>
    var discogSearchIndicator = <SearchIndicator text={"Fetching Discography..."}/>
    var discogProgress = this.state.discogInProgress ? discogSearchIndicator : discogContainer;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={3}>
            <div className="left">
              <Image src={picSource} responsive className="image" />
            </div>
          </Col>
          <Col xs={9} className="one-bottom right-align">
            <ButtonGroup >
              {profileOpenButton}
              {discogOpenButton}
            </ButtonGroup>
          </Col>
          <Col xs={9}>
            <div className="artist-result-title">
              {this.props.result.title}
            </div>
          </Col>
        </Row>
        <div className="clear-both">
          {this.state.showProfileContainer ? profileProgress : null}
          {this.state.showDiscogContainer ? discogProgress : null}
        </div>
      </ListGroupItem>
    );
  },
});

module.exports = ArtistResult;