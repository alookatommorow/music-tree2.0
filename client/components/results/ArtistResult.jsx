var React = require('react');
var ArtistProfileContainer = require('../details/ArtistProfileContainer.jsx');
var DiscogContainer = require('../discogs/DiscogContainer.jsx');
var SearchIndicator = require('../search/SearchIndicator.jsx');

var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Button = require('react-bootstrap/lib/Button');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var ArtistResult = React.createClass({
  getInitialState: function(){
    return {
      profile: null,
      discogDetails: null,
      profileInProgress: false,
      showDiscogContainer: false,
      showProfileContainer: false,
    };
  },

  handleProfileClick: function(event) {
    event.preventDefault();
    if (this.state.profile === null) {
      this.setState({profileInProgress: true, showProfileContainer: true});
      this.props.ajaxRequest(
        {query: this.props.result["id"]},
        '/artist_info',
        this.profileSuccessFunction,
        this.errorFunction
      );
    } else {
      this.setState({showProfileContainer: true})
    }
  },

  handleDiscogClick: function(event) {
    event.preventDefault();
    this.setState({showDiscogContainer: true});
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

  render: function(){
    var picSource
    if (this.props.result.thumb === "") {
      picSource = "https://storage.googleapis.com/music-tree/music-tree-alt.jpg"
    } else {
      picSource = this.props.result.thumb
    }
    var generateButton = function(text, clickHandler) {
      return <Button href="#" bsStyle="primary" onClick={clickHandler}>{text}</Button>
    }
    var profileContainer =
      <ArtistProfileContainer handleCloseClick={this.handleProfileCloseClick} title={this.props.result.title}  profile={this.state.profile} queryType={this.props.queryType} />
    var profileOpenButton = generateButton("Artist Profile", this.handleProfileClick)
    var discogOpenButton = generateButton("Discography", this.handleDiscogClick)
    var profileSearchIndicator = <SearchIndicator text={"Fetching Profile..."}/>
    var profileProgress = this.state.profileInProgress ? profileSearchIndicator : profileContainer;
    var discogContainer = <DiscogContainer numPages={this.state.numPages} origin={this.props.origin} result={this.props.result} discogInProgress={this.state.discogInProgress} title={this.props.result.title} handleCloseClick={this.handleDiscogCloseClick} ajaxRequest={this.props.ajaxRequest} albums={this.state.firstDiscog} />
    var buttons =
      <div>
        <div className="one-right inline-block">
          {profileOpenButton}
        </div>
        <div className="inline-block">
          {discogOpenButton}
        </div>
      </div>

    return (
      <ListGroupItem>
        <Row>
          <Col xs={10} xsOffset={1} sm={4} smOffset={0} >
            <div className="result-image">
              <div>
                <Image src={picSource} className="image" />
              </div>
            </div>
          </Col>
          <Col xsHidden={true} sm={8} className="artist-buttons">
            {buttons}
          </Col>
          <Col xs={10} xsOffset={1} sm={8} smOffset={0} >
            <div className="artist-result-title">
              {this.props.result.title}
            </div>
          </Col>
          <Col xs={10} xsOffset={1} smHidden={true} mdHidden={true} lgHidden={true} className="artist-buttons">
            {buttons}
          </Col>
        </Row>
        <div className="clear-both">
          {this.state.showProfileContainer ? profileProgress : null}
          {this.state.showDiscogContainer ? discogContainer : null}
        </div>
      </ListGroupItem>
    );
  },
});

module.exports = ArtistResult;