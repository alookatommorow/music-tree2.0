var React = require('react');
var ArtistProfileContainer = require('../details/ArtistProfileContainer.jsx');
var DiscogContainer = require('../discogs/DiscogContainer.jsx');
var SearchIndicator = require('../search/SearchIndicator.jsx');

var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');
var Divider = require('material-ui/lib/divider');

var ArtistResult = React.createClass({

  getInitialState: function(){
    return {
      profile: null,
      discogDetails: null,
      profileInProgress: false,
      discogInProgress: false,
      discogEps: null,
      discogLps: null,
      showDiscogContainer: false,
      showProfileContainer: false,
    };
  },

  handleProfileClick: function() {
    if (this.state.profile === null) {
      var query = this.props.results[this.props.resultsKey]["id"];
      this.setState({profileInProgress: true, showProfileContainer: true});
      this.props.ajaxRequest(query, '/artist_info', this.profileSuccessFunction, this.errorFunction);
    } else {
      this.setState({showProfileContainer: true})
    }
  },

  handleDiscogClick: function() {
    if (this.state.discogDetails === null) {
      var query = this.props.results[this.props.resultsKey]["title"]
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
    this.setState({discogDetails: response.all, lps: response.lps, eps: response.eps, discogInProgress: false})
  },

  render: function(){
    var picSource
    if (this.props.result.thumb === "") {
      picSource = "https://storage.googleapis.com/west-coast-skateparks/muisc-tree-alt.jpg"
    } else {
      picSource = this.props.result.thumb
    }
    var profileContainer = <ArtistProfileContainer handleCloseClick={this.handleProfileCloseClick} title={this.props.result.title}  profile={this.state.profile} queryType={this.props.queryType} />
    var profileOpenButton = <RaisedButton className="change-font" onClick={this.handleProfileClick} label='Artist Profile'/>
    var discogOpenButton = <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
    var profileSearchIndicator = <SearchIndicator text={"Fetching Profile..."}/>
    var profileProgress = this.state.profileInProgress ? profileSearchIndicator : profileContainer;

    var discogContainer = <DiscogContainer inProgress={this.state.discogInProgress} origin={this.props.origin} title={this.props.result.title} handleCloseClick={this.handleDiscogCloseClick} ajaxRequest={this.props.ajaxRequest} albums={this.state.discogDetails} eps={this.state.eps} lps={this.state.lps}/>
    var discogCloseButton = <RaisedButton label='Close' onClick={this.handleDiscogCloseClick}/>
    var discogSearchIndicator = <SearchIndicator text={"Fetching Discography..."}/>
    var discogProgress = this.state.discogInProgress ? discogSearchIndicator : discogContainer;

    return (
      <div className="result-margin">
        <ListItem className="hover-arrow">
          <div className="multi-button-box">
            {this.state.showProfileContainer ? null : profileOpenButton}
            {this.state.showDiscogContainer ? null : discogOpenButton}
          </div>
          <div className="left five-right">
            <img src={picSource} className="image"></img>
          </div>
          <div className="clear-right bold one-five-em">
            {this.props.result.title}
          </div>
          <div className="clear-both"></div>
        </ListItem>
        {this.state.showProfileContainer ? profileProgress : null}
        {this.state.showDiscogContainer ? discogProgress : null}
        <Divider />
      </div>
    );
  },

});

module.exports = ArtistResult;